import fs from 'fs/promises'; // Import fs module with promises

// Step 1: Read the JSON file
async function updateJson() {
  try {
    const data = await fs.readFile('public/shortQuestion.json', 'utf8');

    // Step 2: Parse the JSON data
    let jsonData = JSON.parse(data);
    let jsondataget = jsonData.questions
    console.log(jsonData)

    // Step 3: Assign new IDs sequentially starting from 1
    jsonData = jsondataget.map((item, index) => ({
      ...item, // Keep the rest of the data unchanged
      id: index + 1 // Assign new ID starting from 1
    }));

    // Step 4: Write the updated JSON data back to the file
    await fs.writeFile('updatedData.json', JSON.stringify(jsonData, null, 2));

    console.log('File updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Execute the function
updateJson();
