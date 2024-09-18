import fs from 'fs/promises';
import path from 'path';

// Path to the input JSON file
const filePath = path.resolve('shortQuestion.json');

async function addIdsToJson() {
  try {
    // Read and parse the JSON data from the file
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Check if data is an array
    if (!Array.isArray(data)) {
      throw new Error('The JSON data is not an array.');
    }

    // Add unique IDs to each item
    data.forEach((item, index) => {
      item.id = (index + 1).toString(); // Add ID starting from 1
    });

    // Path to the output JSON file
    const outputFilePath = path.resolve('questions_with_ids.json');
    
    // Write the updated JSON data to the new file
    await fs.writeFile(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');

    console.log('IDs added successfully.');
  } catch (error) {
    console.error('Error processing the JSON file:', error);
  }
}

// Run the function
addIdsToJson();
