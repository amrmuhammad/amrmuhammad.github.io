const calculate = () => {
const vector1 = document.getElementById("vector1").value.split(",");
const vector2 = document.getElementById("vector2").value.split(",");
const angle = Math.acos((vector1[1] * vector2[1]) + (vector1[0] * vector2[0])) * 180 / Math.PI;
document.getElementById("angle").innerText = angle + + " degrees";
}

document.getElementById("calculate").addEventListener("click", calculate);
