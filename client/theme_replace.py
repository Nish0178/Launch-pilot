import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Backgrounds
    content = content.replace('bg-slate-950', 'bg-white')
    content = content.replace('bg-slate-900', 'bg-slate-50')
    content = content.replace('bg-white/5', 'bg-slate-50')
    content = content.replace('bg-white/10', 'bg-slate-100')
    
    # Text colors
    # We must be careful not to replace text-white inside buttons that have bg-blue-600
    # Actually, a simpler way is to replace 'text-slate-200' and 'text-slate-300' to darker text.
    content = content.replace('text-slate-200', 'text-slate-800')
    content = content.replace('text-slate-300', 'text-slate-700')
    content = content.replace('text-slate-400', 'text-slate-500')
    
    # Borders
    content = content.replace('border-white/5', 'border-slate-200')
    content = content.replace('border-white/10', 'border-slate-200')
    content = content.replace('border-white/20', 'border-slate-300')
    
    # Indigo to Blue
    content = content.replace('indigo-600', 'blue-600')
    content = content.replace('indigo-500', 'blue-500')
    content = content.replace('indigo-400', 'blue-600')
    content = content.replace('indigo-700', 'blue-700')
    
    # Purple to Blue
    content = content.replace('purple-600', 'blue-600')
    content = content.replace('purple-500', 'blue-500')
    content = content.replace('purple-400', 'blue-600')
    
    # Replace text-white with text-slate-900 ONLY IF it is not preceded by a primary button background
    # This is tricky with regex. Instead of global text-white replace, we'll manually fix the major text-white usages
    # e.g. <h1 className="text-white">, <span className="text-white">
    # Let's use a regex to replace text-white with text-black if it's NOT in a class string containing bg-blue
    def text_white_replacer(match):
        full_class_string = match.group(0)
        if 'bg-blue' in full_class_string or 'bg-black' in full_class_string:
            return full_class_string
        return full_class_string.replace('text-white', 'text-slate-900')

    content = re.sub(r'className="([^"]*)"', text_white_replacer, content)

    if original != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
