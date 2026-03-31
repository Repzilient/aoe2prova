from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Screenshot main list
    page.screenshot(path="/home/jules/verification/screenshots/main_list.png")
    page.wait_for_timeout(1000)

    # Go to settings
    page.click("h1 .menu")
    page.wait_for_timeout(1000)

    # Screenshot settings
    page.screenshot(path="/home/jules/verification/screenshots/settings.png")
    page.wait_for_timeout(1000)

    # Go back to main
    page.click("button.cancel")
    page.wait_for_timeout(1000)

    # Click new build
    page.click(".buildorder-list > button")
    page.wait_for_timeout(1000)

    # Screenshot new build
    page.screenshot(path="/home/jules/verification/screenshots/new_build.png")
    page.wait_for_timeout(1000)

    # Click back to list from new build page (usually there's a back button or save)
    # We will just click save
    page.click(".edit-header > svg")
    page.wait_for_timeout(1000)

    # Go to first build
    page.click(".buildorder")
    page.wait_for_timeout(2000)

    # Screenshot build view
    page.screenshot(path="/home/jules/verification/screenshots/build_view.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        import os
        os.makedirs("/home/jules/verification/videos", exist_ok=True)
        os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()  # MUST close context to save the video
            browser.close()
