import { Box, Pagination } from '@mui/material'
import React from 'react'

function PaginationComponent(props:any) {
    return (
        <Box my={5} width="100%" display="flex" justifyContent="center" alignItems="center">
            <Box bgcolor="white" boxSizing="border-box" display="block" borderRadius="20px">
                <Pagination count={props.pageSize} color="primary" page={props.page} onChange={props.handleChange} />
            </Box>
        </Box>
    )
}

export default PaginationComponent