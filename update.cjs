const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replacements
content = content.replace(/Emeena & Milan/g, 'Dilsara & Ravindu');
content = content.replace(/EMEENA & MILAN/g, 'DILSARA & RAVINDU');
content = content.replace(/Emeena/g, 'Dilsara');
content = content.replace(/Milan/g, 'Ravindu');
content = content.replace(/EMEENA/g, 'DILSARA');
content = content.replace(/MILAN/g, 'RAVINDU');

// Parent details
content = content.replace(/Beloved daughter of/g, 'Beloved Daughter of Late Mr. Pieris & Mrs. Hendawitharana');
content = content.replace(/Beloved son of/g, 'Beloved Son of Mr. & Mrs. Senevirathne');

// Dates and Times
content = content.replace(/July 25, 2026 15:30:00/g, 'August 06, 2026 08:00:00'); 
content = content.replace(/JULY 25, 2026/g, '06 AUGUST 2026');
content = content.replace(/25 JULY 2026/g, '06 AUGUST 2026');
content = content.replace(/SATURDAY, 25 JULY/g, 'THURSDAY, 06 AUGUST');
content = content.replace(/July 10th/g, 'July 25th'); 

// Phone numbers
content = content.replace(/0776543785/g, '+94 71 668 4153');
content = content.replace(/0723399990/g, '+94 71 841 5303');

// Location
content = content.replace(/Grand Tower Banquet Hall/g, 'The Glasgow (Crystal Ballroom)');
content = content.replace(/123 Wedding Avenue, Colombo 03/g, 'No. 39/51, Pelahela Estate');
content = content.replace(/Sri Lanka/g, 'Kandy Road, Kalagedihena, Sri Lanka');

// Fonts
content = content.replace(/font-playball/g, 'font-allura');
content = content.replace(/font-cinzel/g, 'font-playfair');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated.');
