// Portfolio Peak View
const radioTabs = document.querySelectorAll('input[name="tab"]');
const allGrids = document.querySelectorAll('.grid');

// Ensure tab1 is checked on page load
document.getElementById('tab1').checked = true;
showGridForTab(0);

function showGridForTab(tabIndex) {
    allGrids.forEach((grid, i) => {
        grid.classList.remove('active', 'visible');
        grid.style.display = 'none';
    });

    const targetGrid = allGrids[tabIndex];
    targetGrid.style.display = 'grid';

    // Force reflow to prep for transition
    void targetGrid.offsetWidth;

    // Then activate
    targetGrid.classList.add('active');

    // Add 'visible' on next tick to trigger the transition
    setTimeout(() => {
        targetGrid.classList.add('visible');
    }, 10); // 10ms is enough
}

radioTabs.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            showGridForTab(index);
        }
    });
});