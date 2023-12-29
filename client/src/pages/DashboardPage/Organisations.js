import React, { useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import { CiCirclePlus } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import TableContainer from "../../components/containers/TableContainer";
import { Tooltip } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const columns = [
  { name: "Organizational ID", uid: "organizationid" },
  { name: "Organization Name", uid: "organizationname" },
  { name: "Email", uid: "email" },
  { name: "Type", uid: "type" },
  { name: "Mobile No.", uid: "mobile" },
  { name: "Actions", uid: "actions" },
];

const users = [
  {
    organizationid: "#20462",
    organizationname: "lorem ipsum",
    email: "123@gmail.com",
    type: "Student Organisation",
    mobile: "+919416829839",
  },
];
const Organisations = () => {
  const [isActionModalOpen, setActionModal] = useState({});
  const [form, setForm] = useState({});
  const handleActionsModal = ({ action, id = 0 }) => {
    setActionModal({
      ...isActionModalOpen,
      action: action,
      isOpen: true,
    });
    if (action === "edit") {
      // const user = users.find((user) => user.roomid === id);
      // setForm({
      //   roomId: user.roomid,
      //   roomName: user.roomname,
      //   location: user.location,
      //   description: user.description,
      // });
      setForm({
        ...form,
        boardroomId: id,
      });
    } else if (action === "delete") {
      setForm({
        boardroomId: id,
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
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "organizationid":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "organizationname":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "email":
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
      case "mobile":
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
                  handleActionsModal({ action: "edit", id: user.boardroomid })
                }
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                onClick={() =>
                  handleActionsModal({ action: "delete", id: user.boardroomid })
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
            <p className="font-medium text-4xl">Create Organizations</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button type="button">
                <SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <button
                type="button"
                className="bg-[#202020] border border-[#222222] px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                Add
                <CiCirclePlus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Organization Table"}
              columns={columns}
              id={"organizationid"}
              users={users}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Organisations;
