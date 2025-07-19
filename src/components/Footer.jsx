import "../styles/Footer.css";

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return(
        <footer>
            <p>@Arman {year}</p>
            <a href="https://github.com/arman-101/" target="_blank">
                <img src="github.png" alt="github"/>
            </a>
        </footer>
    )
}