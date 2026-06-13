import os
import re

directory = 'src'

replacements = [
    (r'\bslate-', 'zinc-'),
    (r'\bblue-500\b', 'amber-500'),
    (r'\bblue-600\b', 'amber-500'),
    (r'\bblue-700\b', 'amber-600'),
    (r'\bblue-900\b', 'amber-900'),
    (r'\bblue-50\b', 'amber-50'),
    (r'\bblue-100\b', 'amber-100'),
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)

    # Specific contrast fix for buttons:
    def replace_contrast_in_class(match):
        class_str = match.group(1)
        if 'bg-amber-500' in class_str or 'bg-amber-600' in class_str or 'from-amber-500' in class_str:
            class_str = class_str.replace('text-white', 'text-zinc-900')
        return 'className="' + class_str + '"'

    content = re.sub(r'className="([^"]+)"', replace_contrast_in_class, content)

    def replace_contrast_in_class_ticks(match):
        class_str = match.group(1)
        if 'bg-amber-500' in class_str or 'bg-amber-600' in class_str or 'from-amber-500' in class_str:
            class_str = class_str.replace('text-white', 'text-zinc-900')
        return 'className={`' + class_str + '`}'

    content = re.sub(r'className=\{`([^`]+)`\}', replace_contrast_in_class_ticks, content)
    
    def replace_contrast_in_cn(match):
        class_str = match.group(1)
        if 'bg-amber-500' in class_str or 'bg-amber-600' in class_str or 'from-amber-500' in class_str:
            class_str = class_str.replace('text-white', 'text-zinc-900')
        return 'cn(' + class_str + ')'

    content = re.sub(r'cn\(([^)]+)\)', replace_contrast_in_cn, content)

    # Some charts use hardcoded hex colors
    content = content.replace('#6366f1', '#f59e0b') # indigo-500 to amber-500
    content = content.replace('#818cf8', '#fbbf24') # indigo-400 to amber-400
    content = content.replace('#3b82f6', '#f59e0b') # blue-500 to amber-500
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
