import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewChat,
  setShowAllChats,
} from "../../../store/reducers/chat/chatSlice";

import EmployeeSelect from "../../employee-components/employee-select/EmployeeSelect";
import LeadOwnerSearchList from "../../lead-components/lead-owner-search-list/LeadOwnerSearchList";
import SearchBox from "../../search-box-component/SearchBox";
import Message from "../message-component/Message";

import "./Conversation.styles.scss";

interface ConversationProps {
  id?: number;
  newChat?: boolean;
}

const defaultMessageData = {
  id: "",
  message_body: "",
  recipient: "",
  sender: "",
  conversation_id: "",
};

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  email: string;
  phone: string;
  department: string;
  job_title: string;
}
const defaultEmployeeData = {
  id: "",
  first_name: "",
  last_name: "",
  photo_url: "",
  email: "",
  phone: "",
  department: "",
  job_title: "",
};

const Conversation = ({ id, newChat }: ConversationProps) => {
  const dispatch = useDispatch();

  const currentUid = useSelector((state: any) => state.userAuth.uid);
  const showAllChats = useSelector((state: any) => state.chat.showAllChats);

  const [allMessages, setAllMessages] = useState([defaultMessageData]);
  const [searchField, setSearchField] = useState("");
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee>(defaultEmployeeData);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(defaultEmployeeData);

  const backtoAllChats = () => {
    dispatch(setNewChat(false));
    dispatch(setShowAllChats(true));
  };

  const handleNewMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const message = event.target.value.toLowerCase();
    setNewMessage(message);
  };

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  const onEmployeeSelect = (
    id: string,
    firstName: string,
    lastName: string,
    profilePic: string
  ) => {
    setSelectedEmployee({
      id: id,
      first_name: firstName,
      last_name: lastName,
      photo_url: profilePic,
      email: "",
      phone: "",
      department: "",
      job_title: "",
    });
  };

  const handleClearEmployee = () => {
    setSelectedEmployee(defaultEmployeeData);
  };

  useEffect(() => {
    if (!newChat) {
      try {
        fetch(`http://localhost:5001/chat/conversation/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setAllMessages(data);
            const otherUser =
              data[0].sender === currentUid
                ? data[0].recipient
                : data[0].sender;
            fetch(`http://localhost:5001/users/${otherUser}`)
              .then((res) => res.json())
              .then((data) => {
                setOtherUser(data);
              });
          });
      } catch (error) {
        console.log("error fetching conversation", error);
      }
    }
  }, [id, newChat, currentUid]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5001/users`)
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
        });
    } catch (error) {
      console.log("error fetching users in chat component", error);
    }
  }, []);

  useEffect(() => {
    const newFilteredEmployees = employees.filter((employee) => {
      return (
        (employee.first_name &&
          employee.first_name.toLocaleLowerCase().includes(searchField)) ||
        (employee.last_name &&
          employee.last_name.toLocaleLowerCase().includes(searchField))
      );
    });

    setFilteredEmployees(newFilteredEmployees);
  }, [searchField, employees]);

  const handleSendMessage = () => {
    const messageBody = newMessage;
    const recipient = selectedEmployee.id;
    const sender = currentUid;

    const conversationData = {
      recipient: recipient,
      sender: sender,
    };

    const messageData = {
      message_body: messageBody,
      recipient: recipient,
      sender: sender,
    };

    fetch(`http://localhost:5001/chat/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversationData),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:5001/chat/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...messageData, conversation_id: data.id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("message sent", data);
          })
          .catch((error) => {
            console.log("error sending message", error);
          });

        console.log("conversation created", data);
      })
      .catch((error) => {
        console.log("error sending message", error);
      });
  };

  return (
    <div className="conversation-container">
      {!showAllChats && (
        <>
          <>
            <div className="send-to">
              <span
                className="material-symbols-outlined"
                onClick={backtoAllChats}
              >
                arrow_back_ios
              </span>
              {newChat ? (
                selectedEmployee.id.length === 0 ? (
                  <>
                    <div className="search-container">
                      <SearchBox
                        className="seach-box"
                        placeholder="Search Employees"
                        onChangeHandler={onSearchChange}
                      />
                      {searchField.length > 0 && (
                        <LeadOwnerSearchList
                          employees={filteredEmployees}
                          onEmployeeSelected={onEmployeeSelect}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="selected-employee">
                      <EmployeeSelect
                        id={selectedEmployee.id}
                        firstName={selectedEmployee.first_name}
                        lastName={selectedEmployee.last_name}
                        profilePic={selectedEmployee.photo_url}
                      />
                      <span
                        className="material-symbols-outlined"
                        onClick={handleClearEmployee}
                      >
                        close
                      </span>
                    </div>
                  </>
                )
              ) : (
                <div className="employee-name">
                  <EmployeeSelect
                    id={otherUser.id}
                    firstName={otherUser.first_name}
                    lastName={otherUser.last_name}
                    profilePic={otherUser.photo_url}
                  />
                </div>
              )}
            </div>
            <div className="messages-container">
              {allMessages[0].id.length > 0 ? (
                <>
                  {allMessages.map((message) => {
                    const { id, message_body, sender, recipient } = message;
                    return (
                      <Message
                        key={id}
                        message={message_body}
                        recipient={recipient}
                        sender={sender}
                        conversationId={message.conversation_id}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="no-messages"></div>
              )}
            </div>
            <div className="new-message">
              <input
                className="write-message"
                value={newMessage}
                placeholder="Aa"
                onChange={handleNewMessageChange}
              />
              <button className="send-button" onClick={handleSendMessage}>
                Send
              </button>
              <span className="material-symbols-outlined">arrow_upward</span>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Conversation;
