window.addEventListener("load", function() {
	loadXML();
});

function loadXML() {
	var x = new XMLHttpRequest();
	x.open("get", "http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=ENFLD&NumMins=90", true);
	x.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			displayXML(x);
		}
	};
	x.send(null);
}

function displayXML(xml) {
	const doc = xml.responseXML;
	let table = '<tr><th>Due-In</th><th>Destination</th><th>Departure</th><th>Arrival At Destination</th><th>Origin</th></tr>'
	let querytime = doc.getElementsByTagName("Querytime");
	let duein = doc.getElementsByTagName("Duein");
	let destination = doc.getElementsByTagName("Destination");
	let origintime = doc.getElementsByTagName("Origintime");
	let destinationtime = doc.getElementsByTagName("Destinationtime");
	let origin = doc.getElementsByTagName("Origin");
	
	document.getElementById("table_title").innerHTML += querytime[0].innerHTML + ':';

	if (doc.childNodes.length > 0) {
		// First Row
		table += "<tr>";
		table += "<td>" + duein[0].innerHTML + " mins" + "</td>";
		table += "<td>" + destination[0].innerHTML + "</td>";
		table += "<td>" + origintime[0].innerHTML + "</td>";
		table += "<td>" + destinationtime[0].innerHTML + "</td>";
		table += "<td>" + origin[0].innerHTML + "</td>";
		table += "</tr>";
	} else {
		document.getElementById("err").innerHTML = "No data available at this time. Try again later!";
	}

	if (doc.childNodes.length > 1) {
		// Second Row
		table += "<tr>"
		table += "<td>" + duein[1].innerHTML + " mins" + "</td>";
		table += "<td>" + destination[1].innerHTML + "</td>";
		table += "<td>" + origintime[1].innerHTML + "</td>";
		table += "<td>" + destinationtime[1].innerHTML + "</td>";
		table += "<td>" + origin[1].innerHTML + "</td>";
		table += "</tr>"
	}

	document.getElementById("xml_table").innerHTML = table;
}