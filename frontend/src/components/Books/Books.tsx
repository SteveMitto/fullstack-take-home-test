import { Box, Stack, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import request, { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BookCard from './Card';

interface BookType {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}
const allBooks = gql`
  query {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
  `

function Books() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [books, setBooks] = useState<BookType[] | []>([])
  const [filteredBooks, setFilteredBooks] = useState<BookType[] | []>([])
  const { data }: { data: any } = useQuery({
    queryKey: ['books'],
    queryFn: async () => request('http://localhost:4000/books', allBooks)
  })

  useEffect(()=>{
    if (data) setBooks(data.books)
  },[data])

  useEffect(()=>{
    if(searchTerm && data.books) {
      const foundBooks = data.books.filter( book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredBooks(foundBooks)
    }
  },[data,searchTerm])
  return (
    <Stack width="100%" spacing={2} maxHeight={'100vh'}>
      <Box bgcolor="#FFFFFF" p={3} position="fixed" zIndex={10} width="100%" top="0px" display="flex" gap="10%">
        <Box fontWeight={700} fontSize={40} color={(theme: any) => theme.primary.steelBlue}>Books</Box>
        <Box width="50%" display="flex" alignItems='center'>
          {/* <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth id="input-with-sx" label="Find a book" size='small' variant="standard" />
        </Box>
      </Box>
      <Box pt={13} px={3}>
        <Grid container spacing={3}>
          { 
          books  
          ?<BookCard books={filteredBooks.length > 0 ? filteredBooks : books} />
          : <></>
          }
        </Grid>
      </Box>
    </Stack>
  )
}

export default Books