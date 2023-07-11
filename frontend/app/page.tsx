"use client";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  SpaceProps,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { publicAPI } from "../api";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: string;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  publication_date: string;
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    email: string;
    full_name: string;
  };
}

interface BlogPostsResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: BlogPost[];
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date}</Text>
    </HStack>
  );
};

function App() {
  const [posts, setPosts] = useState<BlogPostsResponse["results"]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    (async () => {
      const listPost = await publicAPI.get<BlogPostsResponse>("/post/", {
        params: {
          search: searchQuery,
        },
      });
      setPosts(listPost.data.results);
    })();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
  };

  return (
    <div>
      <Container maxW={"7xl"} p="12">
        <Stack direction="row" spacing={200} align="center">
          <Heading as="h1">BLOG IVORY</Heading>
          <Input
            placeholder="Pesquisar..."
            size="md"
            value={searchQuery}
            onChange={handleSearch}
          />
          {!hasToken && (
            <Stack direction="row" align="center">
              <Button colorScheme="teal" variant="solid" as="a" href="/login">
                Entrar
              </Button>
              <Button
                colorScheme="teal"
                variant="solid"
                as="a"
                href="/register"
              >
                Registrar-se
              </Button>
            </Stack>
          )}
          {hasToken && (
            <Stack direction="row" align="center">
              <Button colorScheme="teal" variant="solid" onClick={handleLogout}>
                Sair
              </Button>
            </Stack>
          )}
        </Stack>
        {posts.map((post) => {
          return (
            <Box
              key={post.id}
              marginTop={{ base: "1", sm: "5" }}
              display="flex"
              flexDirection={{ base: "column", sm: "row" }}
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center"
              >
                <Box
                  width={{ base: "100%", sm: "85%" }}
                  zIndex="2"
                  marginLeft={{ base: "0", sm: "5%" }}
                  marginTop="5%"
                ></Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                  <Box
                    bgGradient={useColorModeValue(
                      "radial(orange.600 1px, transparent 1px)",
                      "radial(orange.300 1px, transparent 1px)"
                    )}
                    backgroundSize="20px 20px"
                    opacity="0.4"
                    height="100%"
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: "3", sm: "0" }}
              >
                <BlogTags tags={[`${post.category.name}`]} />
                <Heading marginTop="1">
                  <Text
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
                    {post.title}
                  </Text>
                </Heading>
                <Text
                  as="p"
                  marginTop="2"
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="lg"
                >
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    as={"a"}
                    href={`/post/${post.id}`}
                  >
                    Ver +
                  </Button>
                </Text>
                <BlogAuthor
                  name={`${post.user.full_name}`}
                  date={`${post.publication_date}`}
                />
              </Box>
            </Box>
          );
        })}
      </Container>
    </div>
  );
}
export default App;
