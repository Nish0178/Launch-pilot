import os
import re

files_to_fix = [
    'src/components/layout/LandingPage.tsx',
    'src/app/sign-up/[[...sign-up]]/page.tsx',
    'src/app/settings/page.tsx',
    'src/app/sign-in/[[...sign-in]]/page.tsx',
    'src/app/dashboard/pitch-deck/page.tsx',
]

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath}, does not exist")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Special fixes based on the grep
    content = content.replace('bg-white text-white', 'bg-white text-slate-800')
    content = content.replace('text-white focus:border', 'text-slate-900 focus:border')
    content = content.replace('hover:bg-slate-100 text-white', 'hover:bg-slate-100 text-slate-900')
    content = content.replace('headerTitle: "text-white"', 'headerTitle: "text-slate-900"')
    content = content.replace('profileSectionTitle: "text-white', 'profileSectionTitle: "text-slate-900')
    content = content.replace('profileSectionTitleText: "text-white"', 'profileSectionTitleText: "text-slate-900"')
    content = content.replace('accordionTriggerButton: "text-white', 'accordionTriggerButton: "text-slate-900')
    content = content.replace('bg-slate-50/50 text-white', 'bg-slate-50/50 text-slate-700')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

for f in files_to_fix:
    process_file(f)

print("Done")
