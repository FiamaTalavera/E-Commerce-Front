import React, { useState } from "react";

const UserProfile = ({ user }) => {
  // configuro Hooks
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setIsEditedUser] = useState({ ...user });

  // cuando el usuario haga click en Editar Perfil, se ejecuta esta funcion
  const handleEditClick = () => {
    setIsEditing(true); // pongo true para que el usuario pueda editar.
  };

  const handleSaveClick = () => {
    // funcion para guardar los cambios

    setIsEditedUser(editedUser);
    setIsEditing(false); // cambio a false para que no pueda editar
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setIsEditedUser({
      // actualizo con los cambios que se hicieron
      ...editedUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <div>
         {/* <label htmlFor="id">ID: </label>
        {isEditing ? (
          <input type="text" id="id" name="id" value={editedUser.id} readOnly />
        ) : (
          <span>{editedUser.id}</span>
        )}
        <br /> */}

        <label htmlFor="name">Nombre: </label>
        {isEditing ? (
          <input
            type="text"
            id="name"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
          />
        ) : (
          <span>{user.name}</span>
        )}
        <br />

        <label htmlFor="last_name">Apellido: </label>
        {isEditing ? (
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={editedUser.last_name}
            onChange={handleChange}
          />
        ) : (
          <span>{user.last_name}</span>
        )}
        <br />

        <label htmlFor="email">Email: </label>
        {isEditing ? (
          <input
            type="text"
            id="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
          />
        ) : (
          <span>{user.email}</span>
        )}
        <br />

        <label htmlFor="address">Dirección: </label>
        {isEditing ? (
          <input
            type="text"
            id="address"
            name="address"
            value={editedUser.address}
            onChange={handleChange}
          />
        ) : (
          <span>{user.address}</span>
        )}
        <br />

        {isEditing ? (
          <button onClick={handleSaveClick}>Guardar Cambios</button>
        ) : (
          <button onClick={handleEditClick}>Editar Perfil</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

/* const UserProfile = ({ user }) => {
  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <div>
        <label htmlFor="id">id: </label>
        <input type="text" id="id" value={user.id} readOnly /> <br></br>
        <label htmlFor="name">Nombre: </label>
        <input type="text" id="name" value={user.name} readOnly /> <br></br>
        <label htmlFor="last_name">Apellido: </label>
        <input type="text" id="last_name" value={user.last_name} readOnly />
        <br></br>
        <label htmlFor="email">email: </label>
        <input type="text" id="email" value={user.email} readOnly /> <br></br>
        <label htmlFor="adress">Dirección: </label>
        <input type="text" id="adress" value={user.adress} readOnly /> <br></br>
        <label htmlFor="is_admin">Administrador: </label>
        <input type="checkbox" id="is_admin" value={user.is_admin} readOnly />
        <br></br>
      </div>
    </div>
  );
}; */

/* export default UserProfile;
 */
