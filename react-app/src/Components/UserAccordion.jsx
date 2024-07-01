import React, { forwardRef, useState } from "react";
import {
  CaretCircleDown,
  CaretCircleUp,
  Check,
  Pencil,
  Trash,
  X,
} from "phosphor-react";
const UserAccordion = ({
  user,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ...user ,name: user.first + " " + user.last});
  const [hasChanges, setHasChanges] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDifference = new Date().getMonth() - birthDate.getMonth();
    return monthDifference < 0 ||
      (monthDifference === 0 && new Date().getDate() < birthDate.getDate())
      ? age - 1
      : age;
  };

  const age = calculateAge(user.dob);
  const isAdult = age >= 18;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "age" || (!isNaN(value) && name === "country")) return;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData.country);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(formData);
    setHasChanges(false);
  };

  return (
    <div className="border p-2 rounded">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => {
          if (!isEditing) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-8">
          <div>
            <img
              src={formData.picture}
              alt=""
              style={{
                borderRadius: "100%",
              }}
            />
          </div>
          <div>{formData.name}</div>
        </div>

        <div>
          {isOpen ? <CaretCircleUp size={32} /> : <CaretCircleDown size={32} />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-2">
          <div className="flex flex-col space-y-2">
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              <input
                type="text"
                name ="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Age</label>
              <input
                type="text"
                name="age"
                value={age}
                disabled
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border rounded w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Rather not say">Rather not say</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
          <div className="mt-2 flex space-x-2 ">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  <Check size={24} />
                </button>
                <button
                  onClick={onCancel}
                  className="p-2 bg-gray-500 text-white rounded"
                >
                  <X size={24} />
                </button>
              </>
            ) : (
              <>
                {isAdult && (
                  <button
                    onClick={onEdit}
                    className="p-2 bg-yellow-500 text-white rounded"
                  >
                    <Pencil size={24} />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this user?"
                      )
                    ) {
                      onDelete(user.id);
                    }
                  }}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  <Trash size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccordion;
