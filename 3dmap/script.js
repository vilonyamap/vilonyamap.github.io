const container = document.getElementById("container");
const draggable = document.getElementById("draggable");

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let prevMouseX;
let prevMouseY;

container.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY * -0.005; // Daha düşük zoom hassasiyeti
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const containerRect = container.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  // Calculate mouse position relative to container center
  const mouseXRelativeToCenter = mouseX - containerRect.left - containerWidth / 2;
  const mouseYRelativeToCenter = mouseY - containerRect.top - containerHeight / 2;

  // Adjust scale based on mouse position
  const newScale = Math.min(Math.max(0.125, scale + delta), 4);

  // Calculate new offset based on mouse position and new scale
  offsetX -= mouseXRelativeToCenter * (newScale - scale);
  offsetY -= mouseYRelativeToCenter * (newScale - scale);

  // Limit offset to keep image within container
  const maxOffsetX = (draggable.clientWidth * newScale - containerWidth) / 2;
  const maxOffsetY = (draggable.clientHeight * newScale - containerHeight) / 2;

  offsetX = Math.min(Math.max(offsetX, -maxOffsetX), maxOffsetX);
  offsetY = Math.min(Math.max(offsetY, -maxOffsetY), maxOffsetY);

  scale = newScale;

  // Apply zoom with smooth transition
  draggable.style.transition = "transform 0.5s ease-in-out";
  draggable.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
});

draggable.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
  prevMouseX = e.clientX;
  prevMouseY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const deltaX = mouseX - prevMouseX;
  const deltaY = mouseY - prevMouseY;
  const containerRect = container.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;
  const imageWidth = draggable.clientWidth * scale;
  const imageHeight = draggable.clientHeight * scale;

  // Calculate maximum offset to keep image within container
  const maxOffsetX = (imageWidth - containerWidth) / 2;
  const maxOffsetY = (imageHeight - containerHeight) / 2;

  // Update offset within limits
  offsetX = Math.min(Math.max(offsetX + deltaX, -maxOffsetX), maxOffsetX);
  offsetY = Math.min(Math.max(offsetY + deltaY, -maxOffsetY), maxOffsetY);

  // Update image transform without animation
  draggable.style.transition = "none";
  draggable.style.transform = `translate(-50%, -50%) scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;

  prevMouseX = mouseX;
  prevMouseY = mouseY;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
