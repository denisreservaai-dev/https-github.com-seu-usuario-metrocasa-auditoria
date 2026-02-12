import os
from playwright.sync_api import sync_playwright

def test_structure():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"Console: {msg.text}"))

        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)
        page.wait_for_load_state("networkidle")

        # Check if function is defined
        is_defined = page.evaluate("typeof perguntarArara === 'function'")
        print(f"perguntarArara is function: {is_defined}")

        if is_defined:
            print("SUCCESS: logic loaded.")
        else:
            print("FAILURE: logic not loaded.")

        page.screenshot(path="verification/screenshot.png")

        browser.close()

if __name__ == "__main__":
    test_structure()
