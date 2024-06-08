import { Alert, Badge, Box, Button, Container, Pagination, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import request, { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ViewListIcon from '@mui/icons-material/ViewList';
import Modal from '@mui/material/Modal';
import BookCard from './Card';
import ReadingList from './ReadingList';

interface BookType {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface SnackbarData {
  open: boolean;
  message: string;
  type: string;
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
  const [openModal, setOpenModal] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = useState<BookType[] | []>([])
  const [readingList, setReadingList] = useState<BookType[] | []>([])
  const [filteredBooks, setFilteredBooks] = useState<BookType[] | []>([])
  const [snackbar, setSnackbar] = React.useState<SnackbarData>({ open: false, message: '', type: '' });
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
    document.getElementById("mainContent")?.scrollTo(0, 0)
  }

  function addToReadingList(title) {
    if (title) {
      const alreadyAdded = readingList.find(book => book.title === title)
      if (!alreadyAdded) {
        const foundBook = books.find(book => book.title === title)
        if (foundBook) {
          setReadingList(init => [...init, foundBook])
          setSnackbar({ open: true, message: "Added " + title, type: "success" })
        }
      } else {
        setSnackbar({ open: true, message: "Book already added ", type: "info" })
      }

      console.log(readingList);

    }
  }

  function handleClose() {
    setSnackbar({ open: false, message: '', type: '' })
  }

  const handleModalClose = () => setOpenModal(false)
  const handleOpen = () => setOpenModal(true);
  return (
    <Stack position="relative" pt={10} width="100%" maxHeight={'100vh'}>
      {/* Title */}
      <Box bgcolor="#FFFFFF" px={3} py={2} position="fixed" zIndex={10} width="100%" top="0px" display="flex" gap="10%" sx={{ background: { xs: '#335C6E', md: '#FFFFFF' }, boxShadow: "#CFFAFA 2px 3px 8px" }} >
        <Box fontWeight={700} fontSize={35} color={(theme: any) => theme.primary.steelBlue} sx={{ color: { xs: "#53C2C2", md: '#335C6E' } }}>Books</Box>
      </Box>

      {/* Search & Reading List */}
      <Grid container px={3} width="100%" pb={1}>
        <Grid item="item" md={9} >
          <Box width="50%" display="flex" alignItems='center'>
            {/* <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
            <TextField value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              fullWidth id="input-with-sx" label="Find a book" size='small' variant="standard" />
          </Box>
        </Grid>

        <Grid item="item" md={3} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
          <Button onClick={()=>handleOpen()}>
            <Typography color={(theme) => theme.primary.steelBlue} fontWeight={"500"}>Student Reading List</Typography>
            <Badge badgeContent={readingList.length} color='primary'>
              <ViewListIcon style={{ color: "#335C6E" }} />
            </Badge>
          </Button>
        </Grid>
      </Grid>


      <Box pt={1} px={3} sx={{ overflowY: "scroll" }} id="mainContent">
        <Grid container spacing={3}>
          {
            books
              ? <BookCard books={filteredBooks.length > 0 ? filteredBooks : books} handleClick={addToReadingList} />
              : <></>
          }
        </Grid>
        {/* <Slide in={trigger} direction='up' timeout={{exit:1500}} > */}
        {/* <Box position="fixed" bottom="40px" width="80%" display="flex" justifyContent="center" alignItems="center"> */}
        <Box my={5} width="100%" display="flex" justifyContent="center" alignItems="center">
          <Box bgcolor="white" boxSizing="border-box" display="block" borderRadius="20px">
            <Pagination count={pageSize} color="primary" page={page} onChange={handleChange} />
          </Box>
        </Box>
        {/* </Slide> */}
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <ReadingList open={openModal} handleClose={handleModalClose} readingList={readingList}/>
    </Stack>
  )
}

export default Books