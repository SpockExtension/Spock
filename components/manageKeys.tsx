import React from "react";
import { atom, useAtom } from "jotai";
import { keyPairsAtom, keyPairDefaultAtom } from "../logic/Atoms";
import { addUser } from '~logic/dbHandler'
import { useStorage } from "@plasmohq/storage/hook";
import { keyPairState } from "~types";
import { Storage } from "@plasmohq/storage"
import { FaTrashAlt, FaCheck, FaPlus, FaDownload } from "react-icons/fa";

function ManageKeys() {
  const [keyPairs, setKeyPairs] = useAtom(keyPairsAtom);
  const [keyPairDefault, setKeyPairDefault] = useAtom(keyPairDefaultAtom);

  const handleRemoveKey = (username) => {
    const newKeyPairs = { ...keyPairs };
    delete newKeyPairs[username];
    setKeyPairs(newKeyPairs);
  };
  const handleSetKeyPairDefault = async (username) => {
    setKeyPairDefault(username);
  };

  const handleAddUser = (username, pubKey) => {
    addUser(username, pubKey);
  };

  const handleDownloadPrivKey = (username, privKey) => {
    const element = document.createElement("a");
    const file = new Blob([privKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `private_key_${username}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const getDefaultKeyPair = () => {
    if (keyPairDefault && keyPairs[keyPairDefault]) {
      const { pubKey, privKey } = keyPairs[keyPairDefault];
      console.log(keyPairs[keyPairDefault]);
      return (
        <tr key={keyPairDefault}>
          <td>{keyPairDefault.slice(0, 3) + (keyPairDefault.length > 10 ? "..." : "")}</td>
          <td>{pubKey.slice(0, 3) + (pubKey.length > 10 ? "..." : "")}</td>
          <td>{privKey.slice(0, 3) + (privKey.length > 10 ? "..." : "")}</td>
          <td>
            <button disabled>Default</button>
          </td>
        </tr>

      );
    } else {
      return (
        <tr>
          <td colSpan={4}>No default key pair set</td>
        </tr>
      );
    }
  };


  return (
    <div>
      <h2>Manage Keys</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Username</th>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Public Key</th>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Private Key</th>
            <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getDefaultKeyPair()}
          {Object.entries(keyPairs).map(([username, { pubKey, privKey }]) => (
            <tr key={username} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "8px" }}>
                {username}
              </td>
              <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "8px" }}>
                {pubKey.slice(0, 3) + (pubKey.length > 10 ? "..." : "")}
              </td>
              <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "8px" }}>
                {privKey.slice(0, 3) + (privKey.length > 10 ? "..." : "")}
              </td>
              <td style={{ padding: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100px" }}>
                  <FaTrashAlt onClick={() => handleRemoveKey(username)} />
                  <FaCheck onClick={() => handleSetKeyPairDefault(username)} />
                  <FaPlus onClick={() => handleAddUser(username, pubKey)} />
                  <FaDownload onClick={() => handleDownloadPrivKey(username, privKey)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default ManageKeys;
