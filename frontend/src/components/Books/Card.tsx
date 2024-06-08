import { Avatar, Box, Chip, Card, CardMedia, CardContent, Typography, Button, Fade, Grow } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react'

interface BookType {
    title: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
}

function BookCard({ books, handleClick }: { books: BookType[], handleClick: any }) {

    // const [allBooks,setAllBooks]=useState(books)

    return books.map((book: BookType, index: number) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
            >
                <Card>
                    <CardMedia sx={{ height: 230 }} image={'../' + book.coverPhotoURL} title={book.title}>
                        <Box p={1}>
                            <Chip style={{ background: "#FFFFFF", color: "#FAAD00" }} color="primary" label="Reading level" size="small" avatar={<Avatar style={{ background: "#FAAD00" }}>{book.readingLevel}</Avatar>} />
                        </Box>
                    </CardMedia>
                    <CardContent >
                        <Typography fontWeight='bold' fontSize="18px" color={(theme) => theme.primary.steelBlue} gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography fontWeight='bold' fontSize="14px" color={(theme) => theme.secondary.teal} gutterBottom>
                            {book.author}
                        </Typography>
                        <Button style={{ padding: "2px 40px", background: "#FAAD00" }} variant="contained" size="small" onClick={() => handleClick(book.title)}
                        >Add</Button>
                    </CardContent>
                </Card>
            </Grow>
        </Grid>
    ))
}

export default BookCard