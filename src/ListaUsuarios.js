import React, { useState, useEffect } from "react";
import { centered_style } from "./styles";
import { Form, useNavigate } from "react-router-dom";
import { GetUserContext } from "./UserContext";
import { ViewIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import {
  tryGetUsers,
  tryBlockUser,
  tryUnblockUser,
  tryGetSystemBalance,
  tryGetUserBalance,
  tryDeposit,
} from "./Backend";
import { PAGE_UNAVAILABLE_MSG } from "./Constants";
import { myBackgroundColor } from "./styles";
import {
  Center,
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
  Select,
} from "@chakra-ui/react";

function ThickDivider() {
  return <Divider borderBottomWidth={"thin"} borderColor={"#07A4A4"} />;
}

export default function ListaUsuarios() {
  const context = GetUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let openSaldo = useDisclosure();
  const [isOpen2, onOpen2, onClose2] = [
    openSaldo.isOpen,
    openSaldo.onOpen,
    openSaldo.onClose,
  ];
  const [usuariosTotales, setUsuariosTotales] = useState(null);
  const [usuariosVisualizados, setUsuariosVisualizados] = useState(null);
  const [usuarioSeleccionado, setUsuariosSeleccionado] = useState(null);
  const [actualizar, setActualizar] = useState(false);
  const [balance, setBalance] = useState(false);
  const [userBalance, setUserBalance] = useState(false);
  const [balanceCharge, setBalanceCharge] = useState(false);

  const [filtrarBloqueados, setFiltrarBloqueados] = useState(false);
  const [filtrarNoBloqueados, setFiltrarNoBloqueados] = useState(false);
  const [filtrarChoferes, setFiltrarChoferes] = useState(false);
  const [filtrarNoChoferes, setFiltrarNoChoferes] = useState(false);
  const [actualizarFiltro, setActualizarFiltro] = useState(false);

  function checkIfBlocked(user) {
    return filtrarBloqueados ? user.blocked : true;
  }
  function checkIfNotBlocked(user) {
    return filtrarNoBloqueados ? !user.blocked : true;
  }
  function checkIfDriver(user) {
    return filtrarChoferes ? user.driver != null : true;
  }
  function checkIfNotDriver(user) {
    return filtrarNoChoferes ? user.driver == null : true;
  }

  useEffect(() => {
    if (!usuariosTotales) {
      return;
    }
    setUsuariosVisualizados(
      usuariosTotales.filter((p) => {
        return (
          checkIfBlocked(p) &&
          checkIfNotBlocked(p) &&
          checkIfDriver(p) &&
          checkIfNotDriver(p)
        );
      })
    );
  }, [actualizarFiltro]);

  function filtrarPorBloqueado(e) {
    const filtro = e.target.value;
    if (filtro === "") {
      setFiltrarBloqueados(false);
      setFiltrarNoBloqueados(false);
      setActualizarFiltro(!actualizarFiltro);
      return;
    }

    if (filtro == "BLOQUEADOS") {
      setFiltrarBloqueados(true);
      setFiltrarNoBloqueados(false);
    } else {
      setFiltrarBloqueados(false);
      setFiltrarNoBloqueados(true);
    }
    setActualizarFiltro(!actualizarFiltro);
  }

  function filtrarPorChofer(e) {
    const filtro = e.target.value;
    if (filtro === "") {
      setFiltrarChoferes(false);
      setFiltrarNoChoferes(false);
      setActualizarFiltro(!actualizarFiltro);
      return;
    }

    if (filtro == "CHOFERES") {
      setFiltrarChoferes(true);
      setFiltrarNoChoferes(false);
    } else {
      setFiltrarChoferes(false);
      setFiltrarNoChoferes(true);
    }
    setActualizarFiltro(!actualizarFiltro);
  }

  /*function filtrarUsuariosBloqueados(e) {
    const filtro = e.target.value;
    if (filtro === "") {
      setUsuariosVisualizados(usuariosTotales);
      return;
    }

    let desired_state;
    filtro.startsWith("NO") ? (desired_state = false) : (desired_state = true);

    if (filtro.includes("BLOQUEADOS")) {
      setUsuariosVisualizados(
        usuariosTotales.filter((p) => p.blocked === desired_state)
      );
    } else {
      desired_state
        ? setUsuariosVisualizados(
            usuariosTotales.filter((p) => p.driver != null)
          )
        : setUsuariosVisualizados(
            usuariosTotales.filter((p) => p.driver === null)
          );
    }
  }*/

  function filtrarPorMail(e) {
    const filtro = e.target.value;

    if (filtro === "") {
      setUsuariosVisualizados(usuariosTotales);
      return;
    }
    setUsuariosVisualizados(
      usuariosTotales.filter((u) => u.email.startsWith(filtro))
    );
  }

  async function getSystemBalance() {
    try {
      let token = context.token.value();
      let response = await tryGetSystemBalance(
        token,
        usuarioSeleccionado.email
      );
      setBalance(response.data.balance);
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserBalance() {
    try {
      let token = context.token.value();
      let response = await tryGetUserBalance(token, usuarioSeleccionado.email);
      setUserBalance(response.data.balance);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        let token = context.token.value();
        let response = await tryGetUsers(token);
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
      let token = context.token.value();
      let response = await tryBlockUser(token, usuarioSeleccionado.email);
    } catch (e) {
      console.log(e);
      alert("Error: No se pudo bloquear al usuario");
      return;
    }
    let userIndex = usuariosTotales.findIndex((obj => obj.email == usuarioSeleccionado.email));
    usuariosTotales[userIndex].blocked = true
    usuarioSeleccionado.blocked = true;
    setActualizarFiltro(!actualizarFiltro);
    alert("Exito: Usuario bloqueado");
  }

  async function handleUnblock() {
    console.log("Unblocking...");
    try {
      let token = context.token.value();
      let response = await tryUnblockUser(token, usuarioSeleccionado.email);
    } catch (e) {
      console.log(e);
      alert("Error: No se pudo desbloquear al usuario");
      return;
    }
    let userIndex = usuariosTotales.findIndex((obj => obj.email == usuarioSeleccionado.email));
    usuariosTotales[userIndex].blocked = false
    usuarioSeleccionado.blocked = false;
    setActualizarFiltro(!actualizarFiltro);
    alert("Exito: Usuario desbloqueado");
  }

  if (!context.userStatus.isLoggedIn) {
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>;
  }
  return (
    <div>
      {usuariosVisualizados ? (
        <Box
          overflowY="auto"
          m="10"
          maxH="full"
          rounded="sm"
          bg={myBackgroundColor}
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
          <Box display={"flex"} gap={10}>
            <Input
              marginLeft={5}
              marginBottom={10}
              borderColor={"black"}
              bg="white"
              w={"40%"}
              placeholder="Buscar usuario por mail..."
              onChange={filtrarPorMail}
            />
            <Select
              bg="white"
              placeholder="Bloqueados y No Bloqueados"
              width="70"
              borderColor={"black"}
              onChange={filtrarPorBloqueado}
            >
              <option value="BLOQUEADOS">Bloqueados</option>
              <option value="NO BLOQUEADOS">No Bloqueados</option>
            </Select>

            <Select
              bg="white"
              placeholder="Choferes y Pasajeros"
              width="70"
              borderColor={"black"}
              onChange={filtrarPorChofer}
            >
              <option value="CHOFERES">Choferes</option>
              <option value="PASAJEROS">Pasajeros</option>
            </Select>
          </Box>
          <Box
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <TableContainer
              rounded={"lg"}
              bg="gray.100"
              boxShadow={"lg"}
              p={8}
              marginLeft={5}
            >
              <Table variant="simple" colorScheme={"blackAlpha"} >
                <Thead>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Nombre</Th>
                    <Th>Apellido</Th>
                    <Th>Chofer</Th>
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
                      <Td>{usuario.driver ? "Si" : "No"}</Td>
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
                    <ThickDivider />
                    <Text>
                      Nombre: {usuarioSeleccionado.username}{" "}
                      {usuarioSeleccionado.surname}
                    </Text>
                    <ThickDivider />
                    <Text>Rating: {usuarioSeleccionado.ratings}/5</Text>
                    <ThickDivider />
                    <Text>
                      Bloqueado: {usuarioSeleccionado.blocked ? "Si" : "No"}
                    </Text>
                    <ThickDivider />
                  </>
                ) : null}

                {usuarioSeleccionado && usuarioSeleccionado.driver != null ? (
                  <>
                    <Text>
                      Patente: {usuarioSeleccionado.driver.licence_plate}
                    </Text>
                    <ThickDivider />
                    <Text>
                      Modelo de Vehiculo: {usuarioSeleccionado.driver.model}
                    </Text>
                    <ThickDivider />
                    <Text>
                      Rating chofer: {usuarioSeleccionado.driver.ratings}
                    </Text>
                    <ThickDivider />
                  </>
                ) : null}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
                <Button
                  bg={"#07A4A4"}
                  color={"white"}
                  _hover={{
                    bg: "#088989",
                  }}
                  margin={5}
                  onClick={() => {
                    if (usuarioSeleccionado.blocked) {
                      alert(
                        "El usuario esta bloqueado, desbloqueelo para cargarle saldo"
                      );
                      return;
                    }
                    onOpen2();
                    getSystemBalance();
                    getUserBalance();
                  }}
                >
                  Cargar Saldo
                </Button>
                <Button
                  bg={"#07A4A4"}
                  color={"white"}
                  _hover={{
                    bg: "#088989",
                  }}
                  onClick={async () => {
                    usuarioSeleccionado && usuarioSeleccionado.blocked
                      ? handleUnblock()
                      : handleBlock();
                    //setActualizar(!actualizar);
                  }}
                >
                  {usuarioSeleccionado && usuarioSeleccionado.blocked
                    ? "Desbloquear"
                    : "Bloquear"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isOpen2}
            onClose={() => {
              onClose2();
              setBalance(null);
              setUserBalance(null);
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Carga de Saldo</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {usuarioSeleccionado ? (
                  <>
                    <Text>Carga de saldo para {usuarioSeleccionado.email}</Text>
                    <ThickDivider />

                    <Text>
                      Balance disponible:{" "}
                      {balance ? balance + " ETH" : <Spinner size="xs" />}
                    </Text>
                    <ThickDivider />

                    <Text>
                      Balance del usuario:{" "}
                      {userBalance ? (
                        userBalance + " ETH"
                      ) : (
                        <Spinner size="xs" />
                      )}
                    </Text>
                    <ThickDivider />

                    <FormLabel marginTop={3} fontWeight={"bold"}>
                      Cantidad a cargar
                    </FormLabel>
                    <Input
                      variant="filled"
                      borderColor={"black"}
                      marginTop={1}
                      w={"60%"}
                      type=""
                      placeholder="ETH..."
                      onChange={(e) => {
                        setBalanceCharge(parseFloat(e.target.value));
                      }}
                    />
                  </>
                ) : null}
              </ModalBody>
              <ModalFooter>
                {" "}
                <Button
                  colorScheme="blackAlpha"
                  mr={3}
                  onClick={() => {
                    onClose2();
                    setBalance(null);
                    setUserBalance(null);
                  }}
                >
                  Cerrar
                </Button>
                <Button
                  bg={"#07A4A4"}
                  color={"white"}
                  _hover={{
                    bg: "#088989",
                  }}
                  margin={5}
                  onClick={async () => {
                    if (balanceCharge > 0.2) {
                      alert(
                        "No esta permitido cargar una cantidad mayor a 0.2 ETH"
                      );
                      return;
                    }

                    if (balanceCharge < 0.0001) {
                      alert(
                        "No esta permitido cargar una cantidad menor a 0.0001 ETH"
                      );
                      return;
                    }

                    if (!balanceCharge) {
                      alert("Debe ingresar una cantidad a cargar");
                      return;
                    }

                    try {
                      let token = context.token.value();
                      let response = tryDeposit(
                        token,
                        usuarioSeleccionado.email,
                        balanceCharge
                      );
                    } catch (e) {
                      console.log(e);
                      alert("No se pudo cargar el saldo");
                      return;
                    }
                    setBalance(null);
                    setUserBalance(null);
                    setBalanceCharge(null);
                    onClose2();
                    alert(
                      "Cargando: " +
                        balanceCharge +
                        " ETH al usuario: " +
                        usuarioSeleccionado.email +
                        "\n" +
                        "El saldo puede tardar unos segundos en actualizarse"
                    );
                  }}
                >
                  Cargar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <Box>
          <Center marginTop={150}>
            <Spinner size="xl" />
          </Center>
        </Box>
      )}
    </div>
  );
}
