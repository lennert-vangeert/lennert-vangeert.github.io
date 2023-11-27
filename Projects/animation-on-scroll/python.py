import os

# Set the path to the folder containing the PNG images
folder_path = "C:/Users/lenne/OneDrive/Bureaublad/Github/Projects/Projects/animation-on-scroll/frames"

# Get the list of files in the folder
files = os.listdir(folder_path)

# Iterate through the files and rename them
for i, file_name in enumerate(files):
    # Check if the file is a PNG image
    if file_name.endswith(".png"):
        # Create the new name with a numeric index
        new_name = os.path.join(folder_path, f"{i+1}.png")
        
        # Construct the full paths for the old and new names
        old_path = os.path.join(folder_path, file_name)
        new_path = os.path.join(folder_path, new_name)

        # Rename the file
        os.rename(old_path, new_path)

print("File names have been successfully changed.")
