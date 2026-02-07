let activeWorkSpaceId = null;

function setActiveWorkSpace(id) {
  activeWorkSpaceId = id;
}

function getActiveWorkSpace() {
  return activeWorkSpaceId;
}

module.exports = { getActiveWorkSpace, setActiveWorkSpace };
