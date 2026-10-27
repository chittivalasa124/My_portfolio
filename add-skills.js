const fs = require('fs');
let d = fs.readFileSync('src/app/core/data.ts', 'utf-8');

// Find the last entry in SKILLS and the closing ];
const marker = "description: 'Hybrid symmetric and asymmetric encryption for confidentiality and data integrity.' }\r\n];";

if (!d.includes(marker)) {
  // Try with LF
  const markerLF = "description: 'Hybrid symmetric and asymmetric encryption for confidentiality and data integrity.' }\n];";
  if (d.includes(markerLF)) {
    console.log('File uses LF endings');
    const newEnd = "description: 'Hybrid symmetric and asymmetric encryption for confidentiality and data integrity.' },\n  { number: 43, symbol: 'CN', name: 'Computer Networks', family: 'Architecture & Concepts', isBrand: false, projects: ['Distributed Systems', 'Microservices'], description: 'TCP/IP stack, DNS, HTTP/HTTPS, OSI model, subnetting, routing protocols, and socket programming.' },\n  { number: 44, symbol: 'DB', name: 'DBMS', family: 'Architecture & Concepts', isBrand: false, projects: ['Data Analysis & Microservices', 'Relational Data Services'], description: 'Relational algebra, normalization, ACID properties, indexing, transactions, and query optimization.' },\n  { number: 45, symbol: 'OS', name: 'Operating System', family: 'Architecture & Concepts', isBrand: false, projects: ['System-Level Engineering'], description: 'Process scheduling, memory management, virtual memory, deadlocks, file systems, and concurrency.' }\n];";
    d = d.replace(markerLF, newEnd);
    fs.writeFileSync('src/app/core/data.ts', d, 'utf-8');
    console.log('SUCCESS (LF): 3 skills added');
  } else {
    console.log('Could not find marker. Showing file end:');
    const endIdx = d.lastIndexOf('];');
    console.log(JSON.stringify(d.substring(endIdx - 200, endIdx + 5)));
  }
} else {
  const newEnd = "description: 'Hybrid symmetric and asymmetric encryption for confidentiality and data integrity.' },\r\n  { number: 43, symbol: 'CN', name: 'Computer Networks', family: 'Architecture & Concepts', isBrand: false, projects: ['Distributed Systems', 'Microservices'], description: 'TCP/IP stack, DNS, HTTP/HTTPS, OSI model, subnetting, routing protocols, and socket programming.' },\r\n  { number: 44, symbol: 'DB', name: 'DBMS', family: 'Architecture & Concepts', isBrand: false, projects: ['Data Analysis & Microservices', 'Relational Data Services'], description: 'Relational algebra, normalization, ACID properties, indexing, transactions, and query optimization.' },\r\n  { number: 45, symbol: 'OS', name: 'Operating System', family: 'Architecture & Concepts', isBrand: false, projects: ['System-Level Engineering'], description: 'Process scheduling, memory management, virtual memory, deadlocks, file systems, and concurrency.' }\r\n];";
  d = d.replace(marker, newEnd);
  fs.writeFileSync('src/app/core/data.ts', d, 'utf-8');
  console.log('SUCCESS (CRLF): 3 skills added');
}

