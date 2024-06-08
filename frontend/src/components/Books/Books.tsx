import { Box, Pagination, Skeleton, Slide, Stack, TextField, useScrollTrigger } from '@mui/material'
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
  const [pageSize, setPageSize] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = useState<BookType[] | []>([])
  const [filteredBooks, setFilteredBooks] = useState<BookType[] | []>([])
  const trigger = useScrollTrigger();
  const { data }: { data: any } = useQuery({
    queryKey: ['books'],
    queryFn: async () => request('http://localhost:4000/books', allBooks)
  })

  useEffect(() => {
    if (data) {
      setBooks(data.books.slice(0, 10))
      const pageSizeCalc = data.books.length / 10
      setPageSize(data.books.length / 10)
    }

  }, [data])

  useEffect(() => {
    if (searchTerm && data.books) {
      const foundBooks = data.books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredBooks(foundBooks)
    }
  }, [data, searchTerm])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setBooks(data.books.slice((value - 1) * pageSize, (value * pageSize)))
    document.getElementById("main")?.scrollTo(0, 0)
  }
  return (
    <Stack position="relative" width="100%" spacing={2} maxHeight={'100vh'}>
      <Box bgcolor="#FFFFFF" p={3} position="fixed" zIndex={10} width="100%" top="0px" display="flex" gap="10%" 
        sx={{ background: { xs:'#335C6E', md: '#FFFFFF' } }}     >
        <Box fontWeight={700} fontSize={40} color={(theme: any) => theme.primary.steelBlue}
          sx={{ color: { xs:"#53C2C2", md: '#335C6E' } }}
          >Books</Box>
        <Box width="50%" display="flex" alignItems='center'>
          {/* <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
          <TextField value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            fullWidth id="input-with-sx" label="Find a book" size='small' variant="standard" />
        </Box>
      </Box>
      <Box pt={13} px={3} sx={{overflowY:"scroll"}} id="main">
        <Grid container spacing={3}>
          {
            books
              ? <BookCard books={filteredBooks.length > 0 ? filteredBooks : books} />
              : <></>
          }
        </Grid>
        {/* <Slide in={trigger} direction='up' timeout={{exit:1500}} > */}
          {/* <Box position="fixed" bottom="40px" width="80%" display="flex" justifyContent="center" alignItems="center"> */}
          <Box  my={5} width="100%" display="flex" justifyContent="center" alignItems="center">
            <Box bgcolor="white" boxSizing="border-box" display="block" borderRadius="20px">
              <Pagination count={pageSize} color="primary" page={page} onChange={handleChange} />
            </Box>
          </Box>
        {/* </Slide> */}
      </Box>
    </Stack>
  )
}

export default Books