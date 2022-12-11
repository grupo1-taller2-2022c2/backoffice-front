import React, { useState, useEffect } from "react";
import { centered_style } from "./styles";
import { useNavigate } from "react-router-dom";
import { GetUserContext } from "./UserContext";
import { ViewIcon } from "@chakra-ui/icons";
import { tryGetUsers, tryBlockUser, tryUnblockUser } from "./Backend";
import {PAGE_UNAVAILABLE_MSG} from "./Constants"
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

export default function HomeScreen() {
  const context = GetUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usuariosTotales, setUsuariosTotales] = useState(null);
  const [usuariosVisualizados, setUsuariosVisualizados] = useState(null);
  const [usuarioSeleccionado, setUsuariosSeleccionado] = useState(null);
  const [actualizar, setActualizar] = useState(false);

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
        let response = await tryGetUsers();
        console.log(response.data);
        setUsuariosTotales(response.data);
        setUsuariosVisualizados(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, [actualizar]);

  async function handleBlock() {
    console.log("Blocking...");
    try {
      let response = await tryBlockUser(usuarioSeleccionado.email);
    } catch (e) {
      console.log(e);
      alert("Error: No se pudo bloquear al usuario");
      return;
    }
    usuarioSeleccionado.blocked = true;
    alert("Exito: Usuario bloqueado");
  }

  async function handleUnblock() {
    console.log("Unblocking...");
    try {
      let response = await tryUnblockUser(usuarioSeleccionado.email);
    } catch (e) {
      console.log(e);
      alert("Error: No se pudo desbloquear al usuario");
      return;
    }
    usuarioSeleccionado.blocked = false;
    alert("Exito: Usuario desbloqueado");
  }

  if (!context.userStatus.isLoggedIn){
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>
  }
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
                    <Th>Bloqueado</Th>
                    <Th isNumeric>Visualizar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {usuariosVisualizados.map((usuario, idx) => (
                    <Tr key={idx}>
                      <Td>{usuario.email}</Td>
                      <Td>{usuario.username}</Td>
                      <Td>{usuario.surname}</Td>
                      <Td>{usuario.blocked ? "Si" : "No"}</Td>
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
                    <Text>Email: {usuarioSeleccionado.email}</Text>
                    <Text>
                      Nombre: {usuarioSeleccionado.username}{" "}
                      {usuarioSeleccionado.surname}
                    </Text>
                    <Text>Rating: {usuarioSeleccionado.ratings}/5</Text>
                    <Text>
                      Bloqueado: {usuarioSeleccionado.blocked ? "Si" : "No"}
                    </Text>
                  </>
                ) : null}
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
                <Button colorScheme="blue" margin={5}>
                  Cargar Saldo
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={async () => {
                    usuarioSeleccionado && usuarioSeleccionado.blocked
                      ? handleUnblock()
                      : handleBlock();
                    setActualizar(!actualizar);
                  }}
                >
                  {usuarioSeleccionado && usuarioSeleccionado.blocked
                    ? "Desbloquear"
                    : "Bloquear"}
                </Button>
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
