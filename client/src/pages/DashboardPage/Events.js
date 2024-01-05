import React, { useEffect, useMemo, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";
import { publicApi } from "../../utils/app.utils";
import toast from "react-hot-toast";
import { useEventsStore } from "../../store/masterStore";


const columns = [
  { name: "Event ID", uid: "eventId" },
  { name: "Events Name", uid: "eventName" },
  { name: "Address", uid: "address" },
  { name: "Type", uid: "type" },
  { name: "Start Date", uid: "startDate" },
  { name: "Actions", uid: "actions" },
];

const Events = () => {
  const [isActionModalOpen, setActionModal] = useState({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { events, setEvents } = useEventsStore(state => state)
  const handleActionsModal = ({ action, id = 0 }) => {
    setActionModal({
      ...isActionModalOpen,
      action: action,
      isOpen: true,
    });
    if (action === "edit") {
      // setForm({
      //   ...form,
      //   eventId: id,
      // });
    } else if (action === "delete") {
      // setForm({
      //   eventId: id,
      // });
    }
  };
  const handleActionsModalClose = () => {
    setActionModal({
      ...isActionModalOpen,
      isOpen: false,
      action: "",
    });
  };
  useEffect(() => {
    setLoading(true)
    publicApi.get("/api/v1/event")
      .then((res) => {
        setEvents(res.data.data)
        setLoading(false)
      })
      .catch((error) => console.log(error.message))
  }, [reload])
  const data = useMemo(() => {
    return events.map(e => {
      return {
        ...e,
        eventId: e._id,
      }
    })
  }, [events])
  const handleSubmit = async (e) => {
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      console.log("edit");
    }
    else if (isActionModalOpen.action === "add") {
      e.preventDefault();
      setLoading(true)
      await publicApi.post("/api/v1/event", {
        eventName: e.target.eventName.value,
        address: e.target.address.value,
        type: e.target.type.value,
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
      })
        .then((res) => {
          toast.success(res.data.message)
          setEvents(res.data.data)
          e.target.reset();
        })
        .catch((error) => toast.error(error.message))
        .finally(() => setLoading(false))
    } else if (isActionModalOpen.action === "delete") {
      console.log("delete");
    }
  };
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "eventId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "eventName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Event" className="!text-white">
              <span
                onClick={() =>
                  handleActionsModal({ action: "edit", id: user.eventId })
                }
                className="text-lg !text-white cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Event">
              <span
                onClick={() =>
                  handleActionsModal({ action: "delete", id: user.eventId })
                }
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <icon.MdOutlineDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="flex items-center justify-center w-full h-full flex-col gap-8">
          <div className="flex items-end md:items-center justify-between text-white w-full md:flex-row flex-col gap-4">
            <p className="font-medium text-4xl">Create Events</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button onClick={() => setReload(!reload)} type="button">
                <icon.SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <button
                type="button"
                onClick={() => handleActionsModal({ action: "add" })}
                className="bg-[#202020] border border-[#222222] px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                Add
                <icon.CiCirclePlus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Events Table"}
              columns={columns}
              id={"eventId"}
              data={data}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={
          isActionModalOpen.action === "edit"
            ? "Edit Events"
            : isActionModalOpen.action === "add"
              ? "Add Events"
              : "Delete Events"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={
          isActionModalOpen.action === "edit"
            ? "Edit Event"
            : isActionModalOpen.action === "add"
              ? "Add Event"
              : "Delete Event"
        }
        formid={
          isActionModalOpen.action === "edit"
            ? "editevents"
            : isActionModalOpen.action === "add"
              ? "addevents"
              : "deleteevents"
        }
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        scrollBehavior=""
        modalClass="text-white"
        enableFooter={true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this event?
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {isActionModalOpen.action === "add"
                  ? "Add Event Details"
                  : "Edit Event Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id={
                isActionModalOpen.action === "edit"
                  ? "editevents"
                  : isActionModalOpen.action === "add"
                    ? "addevents"
                    : "deleteevents"
              }
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-4 flex-col"
            >
              <div className="flex items-center justify-center gap-4 w-full flex-col">
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdEventNote className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Event Name"
                    name="eventName"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.FaRegAddressBook className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Address"
                    name="address"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.LuClipboardType className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Event Type"
                    name="type"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.BsCalendar2Date className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="date"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Start Date"
                    name="startDate"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.BsCalendarDateFill className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="date"
                    className="flex bg-transparent text-sm w-full pl-10 fill-white pr-3 py-3 text-white border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="End Date"
                    name="endDate"
                    required
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </ModalContainer>
    </DashboardContainer>
  );
};

export default Events;
