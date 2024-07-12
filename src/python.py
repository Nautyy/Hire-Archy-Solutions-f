import logging
import azure.functions as func
from azure.storage.blob import BlobServiceClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Parse request body for image data
    image_data = req.get_body()

    # Connect to Azure Blob Storage
    blob_service_client = BlobServiceClient.from_connection_string("<your_connection_string>")
    container_client = blob_service_client.get_container_client("<your_container_name>")

    # Upload image to Blob Storage
    blob_client = container_client.upload_blob(name="image_name.jpg", data=image_data)

    return func.HttpResponse(f"Image uploaded successfully.", status_code=200)
