import { Badge, Box, Button, Fade, IconButton, List, ListItem, ListItemText, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';

function ReadingList(props: any) {
    return (
        <Box>
            <Box position='fixed' right='20px'
                sx={{ width: props.showText ? 'fit-content' : '60px', height: '60px', display: 'grid', placeItems: 'center' }}
                borderRadius="50px" bottom='20px' bgcolor={(theme: any) => theme.primary.steelBlue} >
                <Button onClick={props.handleModalOpen} onMouseEnter={() => props.toggleText()} onMouseLeave={() => props.toggleText()} sx={{ minWidth: 'fit-content' }}>
                    {props.showText &&
                        <Fade in={props.showText} >
                            <Typography px={1} color={(theme: any) => theme.primary.white} fontWeight={"500"}>Student Reading List</Typography>
                        </Fade>
                    }
                    <Badge badgeContent={props.readingList.length} style={{ color: "#FAAD00" }} >
                        <ViewListIcon style={{ color: "#FAAD00" }} />
                    </Badge>
                </Button>
            </Box>

            <Modal
                open={props.open}
                onClose={props.closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'grid', placeItems: 'center' }}
            >
                <Stack bgcolor='#ffffff' width='50%' borderRadius='16px' maxHeight='70%'
                    sx={{ overflowY: 'hidden', width: { xs: '90%', md: '70%', lg: '50%' }, height: { xs: "fit-content" }, maxHeight: { xs: "85vh" } }}
                >
                    <Typography py={3} bgcolor={(theme: any) => theme.primary.steelBlue} borderRadius='16px 16px 0 0' id="modal-modal-title" fontSize='25px' textAlign='center' variant="h3" fontWeight="bold" color={(theme: any) => theme.primary.white} component="h3">
                        Students Reading List
                    </Typography>
                    <Box p={3} sx={{ overflowY: 'scroll' }}  >
                        <Typography py={3} color={(theme: any) => theme.primary.steelBlue} component="small">
                            {props.readingList.length >= 2 && props.readingList.length + ' Books added'}
                        </Typography>
                        <List >
                            {props.readingList.length > 0
                                ? props.readingList.map(book => (
                                    <ListItem key={book.title}
                                        sx={{ cursor: 'pointer' }}
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
                                                <img src={"../" + book.coverPhotoURL} width="50px" alt={book.title} style={{ borderRadius: '8px' }} />
                                                <Box>
                                                    <Typography color={(theme: any) => theme.primary.steelBlue} fontWeight="bold" fontSize='18px'>{book.title}</Typography>
                                                    <Typography fontSize='13px'>{book.author}</Typography>
                                                </Box>
                                            </Box>
                                        </ListItemText>
                                    </ListItem>
                                ))
                                : <Box height="200px" display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
                                    <DeleteIcon color='error' />
                                    <Typography id="modal-modal-title" color='error' variant="h3" fontWeight="bold" component="h3">
                                        No Books Added
                                    </Typography>
                                </Box>
                            }
                        </List>
                    </Box>
                    <Box width='100%' display='flex' justifyContent='center' py={2}>
                        <Button sx={{width:'50%'}} onClick={props.closeModal} variant="outlined" color="error"> Back </Button>
                    </Box>
                </Stack>
            </Modal>
        </Box>
    )
}

export default ReadingList