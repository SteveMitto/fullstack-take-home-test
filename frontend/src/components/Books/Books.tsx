import { Alert, Badge, Box, Button, Fade, IconButton, Pagination, Slide, Snackbar, Stack, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import request, { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ViewListIcon from '@mui/icons-material/ViewList';
import BookCard from './Card';
import ReadingList from './ReadingList';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from './Pagination';

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
  action: string;
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
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [books, setBooks] = useState<BookType[] | []>([])
  const [readingList, setReadingList] = useState<BookType[] | []>([])
  const [filteredBooks, setFilteredBooks] = useState<BookType[] | []>([])
  const [snackbar, setSnackbar] = React.useState<SnackbarData>({ open: false, message: '', type: '', action: '' });
  const [showText, setShowText] = useState(false)

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
          setSnackbar({ open: true, message: "Added " + title, type: "success", action: '' })
        }
      } else {
        setSnackbar({ open: true, message: "Book already added ", type: "info", action: '' })
      }

      console.log(readingList);

    }
  }

  function handleClose() {
    setSnackbar({ open: false, message: '', type: '', action: '' })
  }

  const removeBook = (title) => {
    const bookExists = readingList.find(book => book.title === title)
    if (bookExists) {
      setReadingList(init => init.filter(book => book.title !== title))
      setSnackbar({ open: true, message: "Removed " + title, type: "error", action: 'delete' })

    }
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }
  const handleModalOpen = () => setOpenModal(true);

  const toggleText = () => setShowText(init => !init)

  const hideSearch = () => {
    setShowSearch(false)
    setSearchTerm('')
  }
  return (
    <Stack position="relative" pt={10} width="100%" maxHeight={'100vh'}>
      {/* Title */}
      <Box
        bgcolor="#FFFFFF"
        px={3} py={2}
        position="fixed" zIndex={10} top="0px"
        display="flex" justifyContent='space-between'
        width="-webkit-fill-available" gap="10%" sx={{ background: { xs: '#335C6E', md: '#FFFFFF' }, boxShadow: "#CFFAFA 2px 3px 8px" }} >
        <Typography fontWeight={900} fontSize={35} color={(theme: any) => theme.primary.steelBlue} sx={{ color: { xs: "#53C2C2", md: '#335C6E' } }}>Books</Typography>
        <Button onClick={() => setShowSearch(true)}>
          <Box display='flex' gap="10px" alignItems='center' color={(theme: any) => theme.primary.yellowDark}>
            <Typography fontSize={15} color={(theme: any) => theme.secondary.yellowDark} sx={{ display: { xs: 'none', md: 'block' }, color: { md: "#335C6E" } }}>Search</Typography>
            <SearchIcon sx={{ color: '#FAAD00', fontWeight: 'bold', fontSize: "40px", mb: -1 }} />
          </Box>
        </Button>
      </Box>

      {/* Search */}
      <Slide direction="down" in={showSearch} mountOnEnter unmountOnExit>
        <Box px={3} py={1}>
          <Box display='flex' pb={1} justifyContent='between' alignItems='center'>
            <TextField value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)} id="input-with-sx" label="Find a book" size='small' variant="standard"
              sx={{ textAlign: 'center', width: '90%' }}
            />
            <Button sx={{ display: 'grid', fontSize: 10, pt: -1, placeItems: 'center', width: '20px', height: '20px', p: 0, color: 'white', background: 'rgba(200,0,0,.5)', minWidth: 'fit-content', borderRadius: "50px" }} onClick={() => hideSearch()}>X</Button>
          </Box>
          <Typography>
            {filteredBooks.length > 0 ? `Found + ${filteredBooks.length}  ${filteredBooks.length === 1 ? 'book' : 'books'}` : ''}
          </Typography>
        </Box>
      </Slide>

      {/* Cards  */}
      <Box pt={3} px={3} sx={{ overflowY: "scroll" }} id="mainContent">
        <Grid container spacing={3} >
          {/* NB: Add Skeleton */}
          {books ? <BookCard books={filteredBooks.length > 0 ? filteredBooks : books} handleClick={addToReadingList} /> : <></>}
        </Grid>
        {/* Pagination */}
        <PaginationComponent
          pageSize={pageSize}
          page={page}
          handleChange={handleChange}
        />
      </Box>

      {/* ReadingList */}
      <ReadingList
        open={openModal}
        closeModal={handleModalClose}
        removeBook={removeBook}
        readingList={readingList}
        showText={showText}
        handleModalOpen={handleModalOpen}
        toggleText={toggleText}
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}
        message={snackbar.action === 'delete' ? snackbar.message : undefined}
        action={snackbar.action === 'delete' ?
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
          : null}
      >

        {snackbar.action !== 'delete'
          ? <Alert onClose={handleClose} severity={snackbar.type} sx={{ width: '100%' }} >
            {snackbar.message}
          </Alert>
          : <Typography>{snackbar.message}</Typography>
        }
      </Snackbar>
    </Stack>
  )
}

export default Books