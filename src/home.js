import { USERS_EP, GATEWAY_URL } from "./Constants";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { GetUserContext } from "./UserContext";
import { ViewIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

async function tryGetUsers(token) {
  var url = GATEWAY_URL + USERS_EP;
  return axios.get(url, {
    headers: { Authorization: "Bearer " + token },
  });
}

export default function HomeScreen() {
  const context = GetUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usuariosTotales, setUsuariosTotales] = useState(null);
  const [usuariosVisualizados, setUsuariosVisualizados] = useState(null);
  const [usuarioSeleccionado, setUsuariosSeleccionado] = useState(null);

  /*async function handleListUsers() {
        try{
            let userToken = context.token.value
            let response = await tryGetUsers(userToken);
            console.log(response)
            setUsers(response.data)
        }
        catch(e){
            console.log(e)
        }
    }*/

  useEffect(() => {
    const getUsers = async () => {
      try {
        let userToken = context.token.value;
        let response = await tryGetUsers(userToken);
        console.log(response.data);
        setUsuariosTotales(response.data);
        setUsuariosVisualizados(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      {usuariosVisualizados ? (
        <Box
          overflowY="auto"
          m="10"
          maxH="full"
          rounded="sm"
          bg="gray.300"
          py="10"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          <Box
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <TableContainer marginLeft={5}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Nombre</Th>
                    <Th>Apellido</Th>
                    <Th isNumeric>Visualizar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usuariosVisualizados.map((usuario, idx) => (
                    <Tr key={idx}>
                      <Td>{usuario.email}</Td>
                      <Td>{usuario.username}</Td>
                      <Td>{usuario.surname}</Td>
                      <Th isNumeric>
                        <IconButton
                          onClick={() => {
                            onOpen();

                            setUsuariosSeleccionado(usuario);
                            console.log(usuario);
                          }}
                          icon={<ViewIcon />}
                        />
                      </Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Informacion de Usuario</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {usuarioSeleccionado ? (
                  <>
                    {" "}
                    <Text>{usuarioSeleccionado.email}</Text>
                    <Text>{usuarioSeleccionado.username}</Text>
                    <Text>{usuarioSeleccionado.surname}</Text>
                    <Text>{usuarioSeleccionado.ratings}</Text>
                  </>
                ) : null}
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
                <Button colorScheme="blue" margin={5}>Cargar Saldo</Button>
                <Button colorScheme="blue">Bloquear</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <Text>Cargando...</Text>
      )}
    </div>
  );
}
