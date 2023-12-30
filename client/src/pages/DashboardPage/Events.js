import React, { useState } from 'react'
import DashboardContainer from '../../components/containers/DashboardContainer'
import { SlRefresh } from 'react-icons/sl'
import { CiCirclePlus } from 'react-icons/ci'
import TableContainer from '../../components/containers/TableContainer'
import { Tooltip } from "@nextui-org/react";
import { FaEdit, FaRegCreditCard } from "react-icons/fa";
import { MdOutlineAccessTime, MdOutlineDateRange, MdOutlineDelete } from "react-icons/md";
import ModalContainer from '../../components/containers/ModalContainer'



const columns = [
  { name: "Event ID", uid: "eventid" },
  { name: "Events Name", uid: "eventname" },
  { name: "Address", uid: "address" },
  { name: "Type", uid: "type" },
  { name: "Start", uid: "start" },
  { name: "Actions", uid: "actions" },
];

const users = [
  {
    eventid: "#20462",
    eventname: "lorem ipsum",
    address: "Online",
    type: "Workshop",
    start: "2023-12-11",
  },
];

const Events = () => {

  const [isActionModalOpen, setActionModal] = useState({});
  const [form, setForm] = useState({});
  const handleActionsModal = ({ action, id = 0 }) => {
    setActionModal({
      ...isActionModalOpen,
      action: action,
      isOpen: true,
    });
    if (action === "edit") {
      setForm({
        ...form,
        eventId: id,
      });
    } else if (action === "delete") {
      setForm({
        eventId: id,
      });
    }
  };
  const handleActionsModalClose = () => {
    setActionModal({
      ...isActionModalOpen,
      isOpen: false,
      action: "",
    });
    setForm({});
  };
  const handleSubmit = (e) => {
    if(isActionModalOpen.action==='edit'){
      e.preventDefault();
      console.log("edit")
    }
    else if(isActionModalOpen.action==='add'){
      e.preventDefault()
      console.log("add")
    }else if(isActionModalOpen.action==='delete'){
      console.log("delete")
    }
  }
  const handleInputChange=()=>{
      
  }
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "eventid":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "eventname":
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
      case "start":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "end":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span
                onClick={() =>
                  handleActionsModal({ action: "edit", id: user.eventid })
                }
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                onClick={() =>
                  handleActionsModal({ action: "delete", id: user.eventid })
                }
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <MdOutlineDelete />
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
              <button type="button">
                <SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleActionsModal({ action: "add"})
                }
                className="bg-[#202020] border border-[#222222] px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                Add
                <CiCirclePlus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Events Table"}
              columns={columns}
              id={"eventid"}
              users={users}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={isActionModalOpen.action === "edit" ? "Edit Events" : isActionModalOpen.action === "add" ? "Add Events" : "Delete Events"}
        isOpen={isActionModalOpen.isOpen} 
        onClose={handleActionsModalClose}
        cta={isActionModalOpen.action === "edit" ? "Edit Events" : isActionModalOpen.action === "add" ? "Add Events" : "Delete Events"}
        formid={isActionModalOpen.action === "edit" ? "editevents" : isActionModalOpen.action === "add" ? "addevents" : "deleteevents"}
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        scrollBehavior=""
        modalClass="text-white"
        enableFooter={true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this room
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col">
              <h1 className="capitalize text-sm font-medium">
                {isActionModalOpen.action === "add"
                  ? "Add Event Details"
                  : "Edit Event Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form id="editevents" onSubmit={handleSubmit} className="flex items-center justify-center gap-4 flex-col">
              <div className="flex items-center justify-center gap-4 w-full flex-row">
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <MdOutlineDateRange className="w-6 h-6 text-[#9c9c9c]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-black border border-[#9C9C9C] rounded-[8px] focus:outline-none"
                    placeholder="Event Name"
                    onChange={handleInputChange}
                    value={form.eventname || ""}
                    name="eventname"
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <MdOutlineAccessTime className="w-6 h-6 text-[#9c9c9c]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-black border border-[#9C9C9C] rounded-[8px] focus:outline-none"
                    placeholder="Address"
                    onChange={handleInputChange}
                    value={form.address || ""}
                    name="address"
                    required
                  />
                </div>
              </div>
              
             
            </form>
          </>
        )}

      </ModalContainer>
    </DashboardContainer>
  )
}

export default Events