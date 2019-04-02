package assignment;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.apache.http.client.methods.HttpGet;

public class HTTPClient {
	public static void main (String args[]) throws IOException {
		// Target to extract from
		String theURL = "http://example.com/";
		
		CloseableHttpClient client = HttpClients.createDefault();
		HttpGet request = new HttpGet(theURL);
		CloseableHttpResponse response = client.execute(request);

		// Get the response
		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
		
		// Create a PW to write the result of the GET request to a file
		PrintWriter pw_html = new PrintWriter("result.html");
  
		String line = "";
		while ((line = rd.readLine()) != null) {
			// Save each line of the document to the file
			pw_html.println(line);
		}
  
		// Close the HTML PrintWriter stream
		pw_html.close();
		
		// Create a PW to write each link to a text file
		PrintWriter pw_links = new PrintWriter("hyperlinks.txt");
		
		// Connect to the URL with a HTML parser and get the DOM
		// https://stackoverflow.com/questions/3383152/how-to-find-hyperlink-in-a-webpage-using-java
		Document getDocument = Jsoup.parse(new URL(theURL), 7000);

		// Define a list of all the anchor tags in the document
		Elements links = getDocument.select("a");
		
		// For each link in the list of links, 
		// write the name of the link and the URL associated with it to the file
		for (Element link : links) {
			pw_links.println("Link name: " + link.text());
			pw_links.println("URL: " + link.attr("href"));
			pw_links.println();
		}
		
		System.out.println("Process complete. Check the /workspace/CS402 Assignment Q4 folder for outputs.");
		
		// Close the links PrintWriter stream
		pw_links.close();
		
		// Close the other stuff too
		response.close();
		client.close();
	}
}