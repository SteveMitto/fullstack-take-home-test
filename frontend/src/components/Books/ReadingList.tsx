import { Box, IconButton, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

function ReadingList(props: any) {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box display="flex" alignItems="center" justifyContent='center' width="100%" minHeight="100%">
                <Box bgcolor='#ffffff' width='50%' p={3} borderRadius='15px' minHeight='70%'>
                    <Typography id="modal-modal-title" fontSize='25px' textAlign='center' variant="h3" fontWeight="bold" color={(theme) => theme.primary.steelBlue} component="h3">
                        Students Reading List
                    </Typography>
                    <List>
                        { props.readingList.length > 0
                            ? props.readingList.map(book => (
                                <ListItem key={book.title}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            title="Delete"
                                            onClick={() => props.removeBook(book.title)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText>
                                        <Box display='flex' alignItems="center" gap="10px">
                                                <img src={"../"+book.coverPhotoURL} width="30px" alt={book.title} />
                                                {book.title}
                                        </Box>
                                    </ListItemText>
                                </ListItem>
                            ))
                            : <Box height="300px" display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
                                <DeleteIcon color='error'/>
                                <Typography id="modal-modal-title" color='error' variant="h3" fontWeight="bold" component="h3">
                                    No Books Added
                                </Typography>
                            </Box>
                        }
                    </List>
                </Box>
            </Box>
        </Modal>
    )
}

export default ReadingList