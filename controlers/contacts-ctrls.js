const { Contact } = require("../models");
const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../utils");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) throw HttpError(404);

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Movie with ${contactId} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) throw HttpError(404);

  res.json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
