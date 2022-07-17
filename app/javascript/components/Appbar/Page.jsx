import { Container } from "@mui/material";
import MenuAppBar from "./Appbar";

export default function PageTemplate(props) {
    return (
        <>
            <MenuAppBar />
            <Container component="main" sx={{ pt: 10 }}>
                {props.children}
            </Container>
        </>
    )
}