// Load saved form data on page load
window.onload = function() {
    // Load text inputs
    document.getElementById('name').value = localStorage.getItem('form_name') || '';
    document.getElementById('email').value = localStorage.getItem('form_email') || '';
    
    // Load radio button
    const savedReindeer = localStorage.getItem('form_reindeer');
    if (savedReindeer) {
        document.querySelector(`input[name="reindeer"][value="${savedReindeer}"]`).checked = true;
    }
    
    // Load checkboxes
    document.getElementById('elf').checked = localStorage.getItem('form_movie_elf') === 'true';
    document.getElementById('homealone').checked = localStorage.getItem('form_movie_homealone') === 'true';
    document.getElementById('grinch').checked = localStorage.getItem('form_movie_grinch') === 'true';
    document.getElementById('wonderful').checked = localStorage.getItem('form_movie_wonderful') === 'true';
    document.getElementById('diehard').checked = localStorage.getItem('form_movie_diehard') === 'true';
};