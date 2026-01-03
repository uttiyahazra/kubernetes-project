import os

def print_tree(startpath, prefix=""):
    entries = sorted(os.listdir(startpath))
    for i, entry in enumerate(entries):
        path = os.path.join(startpath, entry)
        connector = "└── " if i == len(entries)-1 else "├── "
        print(prefix + connector + entry)
        if os.path.isdir(path):
            extension = "    " if i == len(entries)-1 else "│   "
            print_tree(path, prefix + extension)

print_tree(os.getcwd())

