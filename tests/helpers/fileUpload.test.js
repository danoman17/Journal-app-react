import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"


// configure credential variables in order to access images in Cloudinay
cloudinary.config({
	cloud_name: 'dqhi0fedb',
	api_key: '261989288886853',
	api_secret: 'Jl5q3IVpCZAWB4MIqVuRzlFEhOA',
	secure: true
})

describe('Pruebas en fileUpload', () => {

	//* Test case: Uploads the file correctly to cloudinary
	test('debe de subir el archivo correctamente en cloudinary', async () => {

		// Sample image URL to be used for testing
		const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';

		// Fetch the image from the provided URL and get its binary data (Blob)
		const resp = await fetch(imageUrl);
		const blob = await resp.blob();

		// Create a new File object with the image binary data and a custom file name
		const file = new File([blob], 'foto.jpg');

		// Call the 'fileUpload' function to upload the file to cloudinary and get the URL
		const url = await fileUpload(file);

		// Expect that the returned URL is a string
		expect(typeof url).toBe('string');

		// Extract the image ID from the URL to delete the uploaded image later
		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.png', '');

		// Call the cloudinary API to delete the uploaded image using its ID
		const cloudResp = await cloudinary.api.delete_resources(['journal-app/' + imageId], {
			resource_type: 'image'
		});
		// console.log({cloudResp});
	});

	//* Test case: Should return null when trying to upload an empty file
	test('debe de retornar null', async () => {

		// Create a new File object with an empty array (no data) and a custom file name
		const file = new File([], 'foto.jpg');

		// Call the 'fileUpload' function with an empty file, expecting it to return null
		const url = await fileUpload(file);

		// Expect that the returned URL is null
		expect(url).toBe(null);
	})
});

