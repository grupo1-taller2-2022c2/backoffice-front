import { PAGE_UNAVAILABLE_MSG } from "./Constants";
import { GetUserContext } from "./UserContext";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { tryGetCurrentPricing, tryModifyPricingRules } from "./Backend";
import makeAnimated from "react-select/animated";
import { myBackgroundColor } from "./styles";
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

function translateToSpanish(day) {
  let result = "";
  switch (day) {
    case "Monday":
      result = "Lunes";
      break;
    case "Tuesday":
      result = "Martes";
      break;
    case "Wednesday":
      result = "Miércoles";
      break;
    case "Thursday":
      result = "Jueves";
      break;
    case "Friday":
      result = "Viernes";
      break;
    case "Saturday":
      result = "Sábado";
      break;
    case "Sunday":
      result = "Domingo";
      break;
  }
  return result;
}

function translateDay(dayNumber) {
  let result = "";
  switch (dayNumber) {
    case 0:
      result = "Monday";
      break;
    case 1:
      result = "Tuesday";
      break;
    case 2:
      result = "Wednesday";
      break;
    case 3:
      result = "Thursday";
      break;
    case 4:
      result = "Friday";
      break;
    case 5:
      result = "Saturday";
      break;
    case 6:
      result = "Sunday";
      break;
  }
  return result;
}
export default function ReglasCotizacion() {
  const context = GetUserContext();
  const [lunes, setLunes] = useState(false);
  const [martes, setMartes] = useState(false);
  const [miercoles, setMiercoles] = useState(false);
  const [jueves, setJueves] = useState(false);
  const [viernes, setViernes] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);

  const [base, setBase] = useState(false);
  const [busyHours, setBusyHours] = useState(false);
  const [busyDays, setBusyDays] = useState(false);
  const [busyHoursCost, setBusyHoursCost] = useState(false);
  const [busyDaysCost, setBusyDaysCost] = useState(false);
  const [durationCost, setDurationCost] = useState(false);
  const [distanceCost, setDistanceCost] = useState(false);
  const [ratingDiscount, setRatingDiscount] = useState(false);
  const [fieldsNeedUpdating, setFieldsNeedUpdating] = useState(false);

  useEffect(() => {
    updateFields();
  }, [fieldsNeedUpdating])

  function handleUpdateDaysFromNumber(dayNumber) {
    let dayName = translateDay(dayNumber);
    days[dayName][1](true);
  }

  const updateFields = async () => {
    try {
      let token = context.token.value();
      let response = await tryGetCurrentPricing(token);
      let info = response.data;
      setBase(info.base);
      setBusyHours(info.busy_hours);
      setBusyHoursCost(info.busy_hours_extra);
      {
        info.days_of_week.map((day) => handleUpdateDaysFromNumber(day));
      }
      setBusyDaysCost(info.week_day_extra);
      setDurationCost(info.duration);
      setDistanceCost(info.distance);
      setRatingDiscount(info.passenger_rating);
    } catch (e) {
      alert("No se pudieron obtener las reglas de cotizacion")
      console.log(e);
    }
  };

  let days = {
    Monday: [lunes, setLunes],
    Tuesday: [martes, setMartes],
    Wednesday: [miercoles, setMiercoles],
    Thursday: [jueves, setJueves],
    Friday: [viernes, setViernes],
    Saturday: [sabado, setSabado],
    Sunday: [domingo, setDomingo],
  };

  let fields = [
    base,
    //busyHours,
    busyHoursCost,
    busyDays,
    busyDaysCost,
    distanceCost,
    durationCost,
    ratingDiscount,
  ];
  useEffect(() => {
    let newList = [];
    for (let day in days) {
      if (days[day][0]) {
        newList.push(day);
      }
    }
    setBusyDays(newList);
    console.log(newList);
  }, [lunes, martes, miercoles, jueves, viernes, sabado, domingo]);

  let hourOptions = Array.from(Array(24).keys());
  const animatedComponents = makeAnimated();
  if (!context.userStatus.isLoggedIn) {
    return <h2>{PAGE_UNAVAILABLE_MSG}</h2>;
  }
  return (
    <>
      <Box
        rounded={"lg"}
        bg="gray.100"
        boxShadow={"lg"}
        p={6}
        justifyContent={"space-evenly"}
        display={"flex"}
        overflowY="auto"
        m="5"
        maxH="full"
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
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: "black",
                  boxShadow: "none",
                }),
              }}
              components={animatedComponents}
              placeholder="Horas..."
              value={
                busyHours
                  ? busyHours.map((number) => {
                      return { value: number, label: number + ":00hs" };
                    })
                  : []
              }
              onChange={(valores) => {
                console.log(valores);
                setBusyHours(valores.map((valor) => valor.value));
              }}
              options={hourOptions.map((number) => {
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
            Precio Base *
          </FormLabel>
          <Input
            value={base ? (base) : ""}
            borderColor={"black"}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Precio base..."
            onChange={(e) => {
              console.log(e.target.value);
              setBase(e.target.value);
            }}
          />
          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Costo de duracion *
          </FormLabel>
          <Input
            value={durationCost ? (durationCost) : ""}
            borderColor={"black"}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo..."
            onChange={(e) => {
              console.log(e.target.value);
              setDurationCost(e.target.value);
            }}
          />
          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Costo de distancia *
          </FormLabel>
          <Input
            value={distanceCost ? (distanceCost) : ""}
            borderColor={"black"}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo..."
            onChange={(e) => {
              console.log(e.target.value);
              setDistanceCost(e.target.value);
            }}
          />

          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Descuento por rating de pasajero *
          </FormLabel>
          <Input
            value={ratingDiscount ? (ratingDiscount) : ""}
            borderColor={"black"}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Descuento..."
            onChange={(e) => {
              console.log(e.target.value);
              setRatingDiscount(e.target.value);
            }}
          />
          <FormLabel
            marginTop={2}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
          >
            Costo extra horas especiales *
          </FormLabel>
          <Input
            value={busyHoursCost ? (busyHoursCost) : ""}
            bg="white"
            borderColor={"black"}
            w={"60%"}
            type=""
            placeholder="Costo..."
            onChange={(e) => {
              console.log(e.target.value);
              setBusyHoursCost(e.target.value);
            }}
          />
        </Box>
        <Box>
          <FormLabel fontSize={20} fontFamily={"heading"} fontWeight={"bold"}>
            Costo extra dias especiales *
          </FormLabel>
          <Input
            value={busyDaysCost ? (busyDaysCost) : ""}
            borderColor={"black"}
            bg="white"
            w={"60%"}
            type=""
            placeholder="Costo..."
            onChange={(e) => {
              console.log(e.target.value);
              setBusyDaysCost(e.target.value);
            }}
          />
          <FormLabel
            marginBottom={4}
            fontSize={20}
            fontFamily={"heading"}
            fontWeight={"bold"}
            marginTop={5}
          >
            Dias de la semana en los que se cobra extra
          </FormLabel>
          <FormControl display="column" alignItems="center">
            {Object.keys(days).map((day) => {
              let { 0: value, 1: setValue } = days[day];
              return (
                <Box key={day}>
                  <FormLabel htmlFor="email-alerts" mb="0">
                    {translateToSpanish(day)}
                  </FormLabel>
                  <Switch
                    value={value}
                    isChecked={value}
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
            <Button
              onClick={async () => {
                if (fields.some((field) => !field)) {
                  alert("Complete todos los campos antes de actualizar");
                  return;
                }
                try {
                  let token = context.token.value();
                  console.log(busyDays);
                  let rules = {
                    base: base,
                    distance: distanceCost,
                    duration: durationCost,
                    days_of_week: busyDays,
                    busy_hours: busyHours,
                    busy_hours_extra: busyHoursCost,
                    week_day_extra: busyDaysCost,
                    passenger_rating: ratingDiscount,
                  };
                  let response = await tryModifyPricingRules(token, rules);
                } catch (e) {
                  console.log(e);
                  alert("Error al actualizar las reglas");
                  return;
                }
                setFieldsNeedUpdating(!fieldsNeedUpdating)
                alert("Reglas actualizadas");
                /*alert(`Valores nuevos: 
                  Base: ${base} 
                  Busy Hours: ${busyHours}
                  Busy Hours extra charge: ${busyHoursCost}
                  Special days of week: ${busyDays}
                  Special days extra charge: ${busyDaysCost}
                  Distance cost multiplier: ${distanceCost}
                  Duration cost multiplier: ${durationCost}
                  Passenger rating multiplier: ${ratingDiscount}
                  `)*/
              }}
              bg={"#07A4A4"}
              color={"white"}
              _hover={{
                bg: "#088989",
              }}
              marginTop={4}
            >
              Actualizar reglas
            </Button>
            <Button
              marginLeft={5}
              onClick={updateFields}
              bg={"#07A4A4"}
              color={"white"}
              _hover={{
                bg: "#088989",
              }}
              marginTop={4}
            >
              Resetear reglas
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
