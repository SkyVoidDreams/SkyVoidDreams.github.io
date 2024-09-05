    function changeLanguage(language) {
        let fullPath = window.location.pathname;
        let fileName = fullPath.substring(fullPath.lastIndexOf('/') + 1);
        localStorage.setItem('language', language);
        const url = `../${language}/${fileName}`;
        window.location = url;
    }
