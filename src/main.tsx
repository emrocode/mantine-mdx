import { createMantineMdxComponents } from "@emrocode/mantine-mdx";
import { Container, MantineProvider, Title } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Document from "./document.mdx";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";

const components = createMantineMdxComponents({
  h1: (props) => (
    <Title
      styles={{
        root: {
          textDecoration: "underline",
        },
      }}
      c="lime"
      {...props}
    />
  ),
});

const App = () => {
  return (
    <Container my="xl">
      <Document components={components} />
    </Container>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={{ primaryColor: "lime" }}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
