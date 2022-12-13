import { PAGE_UNAVAILABLE_MSG } from "./Constants";
import { GetUserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { tryGetCurrentPricing } from "./Backend";
import {
  Box,
  Button,
  FormLabel,
  Input,
  FormControl,
  Switch,
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
export default function ReglasCotizacion() {
  const context = GetUserContext();
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  let days = {
    Lunes: [lunes, setLunes],
    Martes: [martes, setMartes],
    Miercoles: [miercoles, setMiercoles],
    Jueves: [jueves, setJueves],
    Viernes: [viernes, setViernes],
    Sabado: [sabado, setSabado],
    Domingo: [domingo, setDomingo],
  };

  useEffect(() => {
    for (let day in days) {
      if (days[day][0]) console.log(day + "Activado");
    }
    console.log("--------------------");
  }, [lunes, martes, miercoles, jueves, viernes, sabado, domingo]);

  if (!context.userStatus.isLoggedIn) {
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>;
  }
  return (
    <>
      <Box
        justifyContent={"space-evenly"}
        alignItems={"center"}
        display={"flex"}
        overflowY="auto"
        m="10"
        maxH="full"
        rounded="sm"
        bg="gray.300"
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
        <Box>
          <Box>
            <FormLabel fontSize={20} fontFamily={"heading"} fontWeight={"bold"}>
              Horas en las que se cobra extra
            </FormLabel>

            <Select
              isMulti
              options={Array.from(Array(24).keys()).map((number) => {
                return { value: number, label: number + ":00hs" };
              })}
            />
          </Box>
          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Precio Base
          </FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Precio base..."
          />
          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Costo de duracion
          </FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo..."
          />
          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Costo de distancia
          </FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo..."
          />

          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Bonificacion por rating de pasajero
          </FormLabel>
          <Input
            marginTop={2}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Bonificacion..."
          />
        </Box>
        <Box>
          <FormLabel
            marginBottom={4}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Dias de la semana en los que se cobra extra
          </FormLabel>
          <FormControl display="column" alignItems="center">
            {Object.keys(days).map((day) => {
              let { 0: value, 1: setValue } = days[day];
              return (
                <Box key={day}>
                  <FormLabel htmlFor="email-alerts" mb="0">
                    {day}
                  </FormLabel>
                  <Switch
                    colorScheme="whatsapp"
                    sx={{
                      "span.chakra-switch__track:not([data-checked])": {
                        backgroundColor: "#697689",
                      },
                    }}
                    onChange={() => {
                      setValue(!value);
                    }}
                  />
                </Box>
              );
            })}
          </FormControl>
          <Box alignContent={"flex-end"}>
            <Button backgroundColor={"#1273de"} marginTop={2}>
              Actualizar reglas
            </Button>
            <Button
              marginLeft={5}
              onClick={async () => {
                try {
                  let token = context.token.value();
                  let response = await tryGetCurrentPricing(token);
                  console.log(response.data);
                  alert(`Valores actuales: 
                  Base: ${response.data.base} 
                  Busy Hours: ${response.data.busy_hours}
                  Busy Hours extra charge: ${response.data.busy_hours_extra}
                  Special days of week: ${response.data.days_of_week}
                  Special days extra charge: ${response.data.week_day_extra}
                  Distance cost multiplier: ${response.data.distance}
                  Duration cost multiplier: ${response.data.duration}
                  Passenger rating multiplier${response.data.passenger_rating}
                  `);
                } catch (e) {
                  console.log(e);
                }
              }}
              backgroundColor={"#1273de"}
              marginTop={2}
            >
              Ver reglas
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
