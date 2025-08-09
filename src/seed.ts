// import { User } from "./app/modules/user"
// import bcrypt from "bcrypt"

import { Question } from "./app/modules/questions";

// export async function seedDatabase() {
//     try {
//         // create super admin
//         const isSuperAdminExit = await User.findOneAndDelete({ email: "super@admin.com" })
//         if (isSuperAdminExit) {
//             throw new Error("Super Admin already exists")
//         }
//         const superAdmin = await User.create({
//             email: "super@admin.com",
//             name: "Super Admin",
//             role: "superAdmin",
//             status: "active",
//             isDeleted: false,
//             isVerified: true,
//             password: "password",
//         })
//         console.log("Super Admin created:", superAdmin)

//     } catch (error) {
//         console.error(error)
//     }
// }

// seedDatabase()


// src/seed/seedQuestions.ts


const questions = [
    // Competency 1: Basic Computer Skills
    { competency: "Basic Computer Skills", level: "A1", question: "Which device is used to type text into a computer?", options: ["Mouse", "Keyboard", "Monitor", "Printer"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Keyboard" },
    { competency: "Basic Computer Skills", level: "A2", question: "What does the power button on a computer do?", options: ["Increases volume", "Turns the computer on/off", "Opens browser", "Locks the screen"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Turns the computer on/off" },
    { competency: "Basic Computer Skills", level: "B1", question: "Which of these is a file extension for a text document?", options: [".mp3", ".exe", ".docx", ".jpg"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: ".docx" },
    { competency: "Basic Computer Skills", level: "B2", question: "Which device is primarily used for displaying output from a computer?", options: ["Scanner", "Monitor", "Keyboard", "Modem"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Monitor" },
    { competency: "Basic Computer Skills", level: "C1", question: "What is the main purpose of device drivers?", options: ["To speed up the CPU", "To allow the operating system to communicate with hardware", "To store files", "To display images"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To allow the operating system to communicate with hardware" },
    { competency: "Basic Computer Skills", level: "C2", question: "Which action best describes 'formatting' a storage drive?", options: ["Encrypting the drive", "Preparing the drive to store files by creating a filesystem", "Defragmenting the drive", "Changing file extensions"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Preparing the drive to store files by creating a filesystem" },

    // Competency 2: Internet Browsing
    { competency: "Internet Browsing", level: "A1", question: "Which application is used to view websites?", options: ["Word processor", "Web browser", "File explorer", "Email client"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Web browser" },
    { competency: "Internet Browsing", level: "A2", question: "What does URL stand for?", options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Link"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Uniform Resource Locator" },
    { competency: "Internet Browsing", level: "B1", question: "Which action will open a link in a new browser tab?", options: ["Right-click → Open link in a new tab", "Click and hold", "Double-click the page", "Press Escape"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Right-click → Open link in a new tab" },
    { competency: "Internet Browsing", level: "B2", question: "What is a browser cache used for?", options: ["Increase battery life", "Store previously loaded resources for faster loading", "Prevent popups", "Encrypt traffic"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Store previously loaded resources for faster loading" },
    { competency: "Internet Browsing", level: "C1", question: "Which HTTP status code indicates 'Not Found'?", options: ["200", "301", "404", "500"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "404" },
    { competency: "Internet Browsing", level: "C2", question: "What is the primary purpose of using a VPN when browsing?", options: ["To speed up the connection", "To block ads", "To encrypt traffic and hide IP address", "To translate pages"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To encrypt traffic and hide IP address" },

    // Competency 3: Email Communication
    { competency: "Email Communication", level: "A1", question: "Where do you type the recipient's email address?", options: ["Subject", "Body", "To", "Attachment"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To" },
    { competency: "Email Communication", level: "A2", question: "What does CC mean in an email?", options: ["Carbon copy", "Close connection", "Client copy", "Copy content"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Carbon copy" },
    { competency: "Email Communication", level: "B1", question: "Which field should contain a short explanation of the email content?", options: ["To", "Signature", "Subject", "BCC"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Subject" },
    { competency: "Email Communication", level: "B2", question: "What is 'Reply All' used for?", options: ["Send reply to sender only", "Send reply to everyone on the email list", "Forward email to others", "Delete email"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Send reply to everyone on the email list" },
    { competency: "Email Communication", level: "C1", question: "Which practice helps protect against email phishing?", options: ["Open every attachment", "Check sender domain and avoid suspicious links", "Reply with credentials", "Disable spam filter"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Check sender domain and avoid suspicious links" },
    { competency: "Email Communication", level: "C2", question: "Which email authentication protocols help validate senders?", options: ["SMTP and IMAP", "POP3 and HTTPS", "DKIM and SPF", "FTP and DNS"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "DKIM and SPF" },

    // Competency 4: Word Processing
    { competency: "Word Processing", level: "A1", question: "Which function is used to make text bold?", options: ["Ctrl + I", "Ctrl + U", "Ctrl + B", "Ctrl + S"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Ctrl + B" },
    { competency: "Word Processing", level: "A2", question: "Which menu would you use to change page margins?", options: ["Insert", "Page Layout / Layout", "Review", "View"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Page Layout / Layout" },
    { competency: "Word Processing", level: "B1", question: "What is 'Track Changes' used for?", options: ["To check spelling", "To record edits made to a document", "To add images", "To print"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To record edits made to a document" },
    { competency: "Word Processing", level: "B2", question: "Which format preserves layout and is commonly used for sharing documents?", options: [".txt", ".docx", ".pdf", ".csv"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: ".pdf" },
    { competency: "Word Processing", level: "C1", question: "What is a mail merge primarily used for?", options: ["Designing slides", "Sending personalized documents to many recipients using a data source", "Editing images", "Recording macros"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Sending personalized documents to many recipients using a data source" },
    { competency: "Word Processing", level: "C2", question: "Which feature automates repetitive formatting or content insertion in many word processors?", options: ["Styles and templates", "Track changes", "Print preview", "Spell check"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Styles and templates" },

    // Competency 5: Spreadsheets
    { competency: "Spreadsheets", level: "A1", question: "Which of these is a cell reference in a spreadsheet?", options: ["Row1", "A1", "Cell(1)", "1A"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A1" },
    { competency: "Spreadsheets", level: "A2", question: "Which symbol starts a formula in most spreadsheets?", options: ["#", "@", "=", "%"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "=" },
    { competency: "Spreadsheets", level: "B1", question: "Which function adds up a range of cells?", options: ["COUNT", "SUM", "AVERAGE", "MAX"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "SUM" },
    { competency: "Spreadsheets", level: "B2", question: "Which feature helps visualize trends in data?", options: ["Conditional formatting", "Charts/Graphs", "Print area", "Freeze panes"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Charts/Graphs" },
    { competency: "Spreadsheets", level: "C1", question: "Which function returns the average of a range excluding empty cells?", options: ["SUM", "AVERAGE", "AVERAGEIF", "COUNT"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "AVERAGE" },
    { competency: "Spreadsheets", level: "C2", question: "Which tool is commonly used for advanced data summarization in spreadsheets?", options: ["Pivot Table", "Find & Replace", "Spell Check", "AutoFill"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Pivot Table" },

    // Competency 6: Presentation Software
    { competency: "Presentation Software", level: "A1", question: "Which action adds a new slide in most presentation apps?", options: ["Insert → New Slide", "File → Save", "View → Zoom", "Edit → Undo"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Insert → New Slide" },
    { competency: "Presentation Software", level: "A2", question: "What is the purpose of 'Slide Show' mode?", options: ["To edit text", "To display slides full-screen for presentation", "To save the file", "To change templates"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To display slides full-screen for presentation" },
    { competency: "Presentation Software", level: "B1", question: "Which element improves readability on a slide?", options: ["Lots of small text", "High contrast between text and background", "Multiple fonts", "Multiple animations"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "High contrast between text and background" },
    { competency: "Presentation Software", level: "B2", question: "Which format is best to share a presentation when you don't want recipients to edit it?", options: [".pptx", ".odp", ".pdf", ".docx"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: ".pdf" },
    { competency: "Presentation Software", level: "C1", question: "Which feature is useful to rehearse timing for a presentation?", options: ["Notes pane", "Rehearse timings", "Slide sorter", "Master view"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Rehearse timings" },
    { competency: "Presentation Software", level: "C2", question: "What is a slide master used for?", options: ["To create an outline", "To define global styles and layouts across all slides", "To add animations", "To export to video"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To define global styles and layouts across all slides" },

    // Competency 7: Database Management
    { competency: "Database Management", level: "A1", question: "Which term describes a single row in a database table?", options: ["Column", "Row / Record", "Field", "Schema"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Row / Record" },
    { competency: "Database Management", level: "A2", question: "Which of these is a common column type for text values?", options: ["INT", "VARCHAR / TEXT", "DATE", "FLOAT"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "VARCHAR / TEXT" },
    { competency: "Database Management", level: "B1", question: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "System Query Language", "Standard Query Logic"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Structured Query Language" },
    { competency: "Database Management", level: "B2", question: "Which SQL clause is used to filter rows?", options: ["ORDER BY", "WHERE", "GROUP BY", "FROM"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "WHERE" },
    { competency: "Database Management", level: "C1", question: "What is a foreign key used for?", options: ["To uniquely identify a row", "To reference a primary key in another table", "To encrypt data", "To index columns"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To reference a primary key in another table" },
    { competency: "Database Management", level: "C2", question: "Which operation ensures data integrity by applying multiple changes as a single unit?", options: ["Indexing", "Transaction", "Backup", "Replication"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Transaction" },

    // Competency 8: Cybersecurity Basics
    { competency: "Cybersecurity Basics", level: "A1", question: "Which of these should you never share over email?", options: ["A public event invite", "Your password", "A meeting time", "A contact number"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Your password" },
    { competency: "Cybersecurity Basics", level: "A2", question: "What is a strong password practice?", options: ["Use 'password123'", "Use the same password everywhere", "Use a mix of letters, numbers and symbols", "Use your birthdate"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use a mix of letters, numbers and symbols" },
    { competency: "Cybersecurity Basics", level: "B1", question: "What is phishing?", options: ["A password manager feature", "A scam to trick users into giving sensitive info", "A type of firewall", "A software update"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A scam to trick users into giving sensitive info" },
    { competency: "Cybersecurity Basics", level: "B2", question: "Which is a recommended method to protect online accounts?", options: ["Use the same password", "Use two-factor authentication (2FA)", "Share passwords with colleagues", "Use public Wi-Fi for banking"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use two-factor authentication (2FA)" },
    { competency: "Cybersecurity Basics", level: "C1", question: "What is the role of antivirus software?", options: ["To block all websites", "To detect and remove malware", "To speed up the computer", "To backup files"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To detect and remove malware" },
    { competency: "Cybersecurity Basics", level: "C2", question: "Which term describes an attacker exploiting a previously unknown vulnerability?", options: ["Patch", "Zero-day exploit", "Firewall", "Phishing"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Zero-day exploit" },

    // Competency 9: Operating Systems
    { competency: "Operating Systems", level: "A1", question: "Which of these is an operating system?", options: ["Microsoft Word", "Windows", "Google Chrome", "Adobe Reader"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Windows" },
    { competency: "Operating Systems", level: "A2", question: "Which OS is commonly used on smartphones?", options: ["Windows XP", "Linux Mint", "Android", "DOS"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Android" },
    { competency: "Operating Systems", level: "B1", question: "Which tool shows currently running programs and performance stats on Windows?", options: ["Task Manager", "Registry Editor", "Control Panel", "Disk Management"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Task Manager" },
    { competency: "Operating Systems", level: "B2", question: "What is the purpose of system updates?", options: ["To change wallpaper", "To provide security fixes and improvements", "To delete files", "To uninstall apps"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To provide security fixes and improvements" },
    { competency: "Operating Systems", level: "C1", question: "Which filesystem feature tracks free and used space and file metadata?", options: ["Partition table", "Filesystem", "BIOS", "Bootloader"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Filesystem" },
    { competency: "Operating Systems", level: "C2", question: "What does 'kernel' refer to in an operating system?", options: ["A user interface theme", "Core component managing system resources", "A file manager", "A package installer"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Core component managing system resources" },

    // Competency 10: File Management
    { competency: "File Management", level: "A1", question: "Which action saves a document to disk?", options: ["Open", "Save", "Print", "Close"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Save" },
    { competency: "File Management", level: "A2", question: "What does 'copy' do?", options: ["Removes the original", "Creates a duplicate while keeping the original", "Encrypts the file", "Shares instantly"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Creates a duplicate while keeping the original" },
    { competency: "File Management", level: "B1", question: "Which action moves a file from one folder to another?", options: ["Copy", "Cut and Paste", "Rename", "Print"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Cut and Paste" },
    { competency: "File Management", level: "B2", question: "Which method is used to reduce file size for easier sharing?", options: ["Encrypting", "Compressing (zipping)", "Renaming", "Changing extension"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Compressing (zipping)" },
    { competency: "File Management", level: "C1", question: "What is the benefit of using version control for files?", options: ["Saves files as PDF", "Tracks changes and allows rollback", "Compresses files", "Deletes duplicates"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Tracks changes and allows rollback" },
    { competency: "File Management", level: "C2", question: "Which backup strategy offers the fastest full restore and conserves space by storing changes since last full backup?", options: ["Full backup only", "Differential backup", "No backup", "Manual copy"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Differential backup" },

    // Competency 11: Social Media Use
    { competency: "Social Media Use", level: "A1", question: "Which platform is commonly used to post short messages and updates?", options: ["Twitter/X", "Excel", "Notepad", "Terminal"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Twitter/X" },
    { competency: "Social Media Use", level: "A2", question: "What is a 'profile' on social media?", options: ["A type of spreadsheet", "A user’s page showing their info and posts", "An email sign", "A video format"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A user’s page showing their info and posts" },
    { competency: "Social Media Use", level: "B1", question: "Which practice helps protect your privacy on social media?", options: ["Share all personal info", "Use strong unique passwords and privacy settings", "Accept all friend requests", "Post passwords"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use strong unique passwords and privacy settings" },
    { competency: "Social Media Use", level: "B2", question: "What is the difference between public and private accounts?", options: ["Public accounts cost money", "Private accounts restrict who can view content", "Public accounts are offline", "Private accounts auto-delete posts"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Private accounts restrict who can view content" },
    { competency: "Social Media Use", level: "C1", question: "What is a 'social media analytics' metric?", options: ["A word processor feature", "A measurable data point like engagement rate", "An image format", "An OS update"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A measurable data point like engagement rate" },
    { competency: "Social Media Use", level: "C2", question: "Which practice is important when managing social media for a brand?", options: ["Ignore comments", "Post without strategy", "Maintain consistent voice and measure performance", "Only post once a year"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Maintain consistent voice and measure performance" },

    // Competency 12: Digital Communication Etiquette
    { competency: "Digital Communication Etiquette", level: "A1", question: "Which is polite to include at the end of an email?", options: ["Random emoticons", "A clear sign-off like 'Best regards'", "All passwords", "No subject"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A clear sign-off like 'Best regards'" },
    { competency: "Digital Communication Etiquette", level: "A2", question: "What is appropriate when replying to a formal email?", options: ["Use slang", "Use a respectful and clear tone", "Use all caps", "Send emojis only"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use a respectful and clear tone" },
    { competency: "Digital Communication Etiquette", level: "B1", question: "When writing a work email, where should action items be placed?", options: ["Hidden in attachments", "Clearly listed in body or bullets", "Only in CC", "In the subject only"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Clearly listed in body or bullets" },
    { competency: "Digital Communication Etiquette", level: "B2", question: "Which is best when responding to criticism professionally online?", options: ["Attack the critic", "Ignore permanently", "Acknowledge and respond respectfully", "Delete all comments"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Acknowledge and respond respectfully" },
    { competency: "Digital Communication Etiquette", level: "C1", question: "Why is it important to use clear subject lines in emails?", options: ["To confuse recipients", "To make emails searchable and clarify purpose", "To add artwork", "To avoid attachments"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To make emails searchable and clarify purpose" },
    { competency: "Digital Communication Etiquette", level: "C2", question: "Which approach improves clarity in cross-cultural digital communication?", options: ["Assume everyone understands idioms", "Use plain language and confirm understanding", "Use slang often", "Avoid confirmations"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use plain language and confirm understanding" },

    // Competency 13: Cloud Computing
    { competency: "Cloud Computing", level: "A1", question: "Which service lets you store files online and access them from anywhere?", options: ["Local folder only", "Cloud storage (e.g., Google Drive)", "CD-ROM", "Floppy disk"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Cloud storage (e.g., Google Drive)" },
    { competency: "Cloud Computing", level: "A2", question: "Which is an example of a cloud provider?", options: ["Microsoft Word", "Dropbox", "Paint", "Calculator"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Dropbox" },
    { competency: "Cloud Computing", level: "B1", question: "What is 'sync' in cloud storage", options: ["Compress files", "Keep files updated across devices", "Encrypt files only", "Delete files automatically"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Keep files updated across devices" },
    { competency: "Cloud Computing", level: "B2", question: "Which benefit does cloud computing commonly provide?", options: ["Infinite free storage without limits", "Scalability and remote access", "No internet needed", "Guaranteed anonymity"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Scalability and remote access" },
    { competency: "Cloud Computing", level: "C1", question: "What is SaaS (Software as a Service)?", options: ["Installing software on-premise", "Software hosted and accessed over the internet", "A type of hardware", "A security protocol"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Software hosted and accessed over the internet" },
    { competency: "Cloud Computing", level: "C2", question: "Which concept describes using multiple cloud providers to reduce vendor lock-in?", options: ["Cloud bursting", "Multi-cloud strategy", "Single-tenant hosting", "Local backup"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Multi-cloud strategy" },

    // Competency 14: Online Collaboration
    { competency: "Online Collaboration", level: "A1", question: "Which tool lets multiple people edit the same document at once?", options: ["Desktop notepad", "Google Docs", "Calculator", "DVD player"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Google Docs" },
    { competency: "Online Collaboration", level: "A2", question: "What is a shared workspace?", options: ["A single-user folder", "A place where a team can jointly access files and tools", "A printer", "A physical office"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A place where a team can jointly access files and tools" },
    { competency: "Online Collaboration", level: "B1", question: "Which practice helps avoid conflicts when collaborating on documents?", options: ["Edit without communication", "Use version history and comments", "Delete others' work", "Use unknown apps"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use version history and comments" },
    { competency: "Online Collaboration", level: "B2", question: "Which app type supports real-time video meetings and screen sharing?", options: ["Spreadsheet", "Video conferencing tools", "Text editors", "Image editors"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Video conferencing tools" },
    { competency: "Online Collaboration", level: "C1", question: "What is asynchronous collaboration?", options: ["Working at the same time", "Working at different times without needing instant response", "A chat feature", "A special hardware mode"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Working at different times without needing instant response" },
    { competency: "Online Collaboration", level: "C2", question: "Which governance practice helps maintain team collaboration security?", options: ["Sharing admin passwords openly", "Role-based access controls and permissions", "No backups", "Disabling logs"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Role-based access controls and permissions" },

    // Competency 15: Programming Basics
    { competency: "Programming Basics", level: "A1", question: "Which symbol often ends a statement in languages like JavaScript and C?", options: [".", ";", ":", ","], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: ";" },
    { competency: "Programming Basics", level: "A2", question: "What is a variable used for in programming?", options: ["To store data values", "To print documents", "To style a webpage", "To manage files"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To store data values" },
    { competency: "Programming Basics", level: "B1", question: "Which construct lets you repeat code multiple times?", options: ["Function", "Loop", "Comment", "Variable"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Loop" },
    { competency: "Programming Basics", level: "B2", question: "What is debugging?", options: ["Adding new features", "Finding and fixing errors in code", "Deleting files", "Designing interfaces"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Finding and fixing errors in code" },
    { competency: "Programming Basics", level: "C1", question: "Which data structure stores key-value pairs?", options: ["Array", "Object / Dictionary", "Integer", "Float"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Object / Dictionary" },
    { competency: "Programming Basics", level: "C2", question: "What does 'asynchronous programming' allow?", options: ["Only one operation at a time", "Performing tasks without blocking the main program flow", "Faster typing", "Auto-formatting code"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Performing tasks without blocking the main program flow" },

    // Competency 16: Data Analysis
    { competency: "Data Analysis", level: "A1", question: "Which chart is good for showing parts of a whole?", options: ["Line chart", "Bar chart", "Pie chart", "Scatter plot"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Pie chart" },
    { competency: "Data Analysis", level: "A2", question: "What does 'average' commonly refer to?", options: ["Mode", "Median", "Mean", "Variance"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Mean" },
    { competency: "Data Analysis", level: "B1", question: "Which tool is commonly used to analyze spreadsheet data?", options: ["Pivot tables", "Paint", "Notepad", "Calculator"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Pivot tables" },
    { competency: "Data Analysis", level: "B2", question: "What is outlier in a dataset?", options: ["A value that is typical", "A value significantly different from others", "A missing value", "A label"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A value significantly different from others" },
    { competency: "Data Analysis", level: "C1", question: "Which metric measures central tendency but is robust to extreme values?", options: ["Mean", "Median", "Standard deviation", "Variance"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Median" },
    { competency: "Data Analysis", level: "C2", question: "What is the purpose of correlation analysis?", options: ["To prove causation", "To measure the strength and direction of a relationship between variables", "To sort data", "To format cells"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To measure the strength and direction of a relationship between variables" },

    // Competency 17: Graphic Design Basics
    { competency: "Graphic Design Basics", level: "A1", question: "Which tool would you use to crop an image?", options: ["Crop tool", "Brush tool", "Text tool", "Eraser"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Crop tool" },
    { competency: "Graphic Design Basics", level: "A2", question: "Which file format is best for logos that need to scale without losing quality?", options: [".jpg", ".png", ".svg", ".mp3"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: ".svg" },
    { competency: "Graphic Design Basics", level: "B1", question: "Which color model is used for printing?", options: ["RGB", "CMYK", "HEX", "HSL"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "CMYK" },
    { competency: "Graphic Design Basics", level: "B2", question: "What does 'resolution' refer to in images?", options: ["Color palette", "Number of pixels per inch", "File size only", "Number of layers"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Number of pixels per inch" },
    { competency: "Graphic Design Basics", level: "C1", question: "Which principle improves visual hierarchy in design?", options: ["Random fonts", "Consistent spacing and contrast", "Clashing colors", "Tiny text"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Consistent spacing and contrast" },
    { competency: "Graphic Design Basics", level: "C2", question: "What is 'vector graphics' advantage over raster?", options: ["Smaller file size always", "Scale without losing quality", "Always more colorful", "Require no software"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Scale without losing quality" },

    // Competency 18: Video Editing Basics
    { competency: "Video Editing Basics", level: "A1", question: "Which term means moving from one clip to the next?", options: ["Transition", "Render", "Export", "Import"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Transition" },
    { competency: "Video Editing Basics", level: "A2", question: "Which file is typically used to play video offline after editing?", options: [".docx", ".mp4", ".xlsx", ".pptx"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: ".mp4" },
    { competency: "Video Editing Basics", level: "B1", question: "What is trimming in video editing?", options: ["Adding text", "Cutting the start/end of a clip", "Changing colors", "Adding audio"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Cutting the start/end of a clip" },
    { competency: "Video Editing Basics", level: "B2", question: "Which process prepares the edited video into a final file?", options: ["Importing", "Rendering/Exporting", "Trimming", "Scripting"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Rendering/Exporting" },
    { competency: "Video Editing Basics", level: "C1", question: "What is color grading used for?", options: ["Adjusting the tone and mood of footage", "Adding transitions", "Removing audio", "Applying subtitles"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Adjusting the tone and mood of footage" },
    { competency: "Video Editing Basics", level: "C2", question: "Which technique helps reduce flicker and stabilize shaky footage?", options: ["Stabilization and frame blending", "Color correction only", "Adding music", "Increasing contrast"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Stabilization and frame blending" },

    // Competency 19: Digital Marketing
    { competency: "Digital Marketing", level: "A1", question: "Which channel is used for posting short promotional messages?", options: ["Email", "Billboard", "Social media", "Fax"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Social media" },
    { competency: "Digital Marketing", level: "A2", question: "What is SEO mainly used for?", options: ["Improve website search ranking", "Design logos", "Make videos", "Encrypt websites"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Improve website search ranking" },
    { competency: "Digital Marketing", level: "B1", question: "Which metric indicates how many users click on an ad or link?", options: ["Bounce rate", "Click-through rate (CTR)", "Impressions", "Site speed"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Click-through rate (CTR)" },
    { competency: "Digital Marketing", level: "B2", question: "What is A/B testing used for in marketing?", options: ["Reduce costs", "Compare two versions to find the better performer", "Encrypt data", "Design logos"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Compare two versions to find the better performer" },
    { competency: "Digital Marketing", level: "C1", question: "What does CPA (Cost Per Acquisition) measure?", options: ["Cost to design a page", "Cost per completed conversion or sale", "Number of visitors", "Bounce rate"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Cost per completed conversion or sale" },
    { competency: "Digital Marketing", level: "C2", question: "Which strategy helps build long-term organic traffic?", options: ["Buying fake followers", "Consistent high-quality content and SEO", "Aggressive popups", "Using only paid ads"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Consistent high-quality content and SEO" },

    // Competency 20: E-commerce
    { competency: "E-commerce", level: "A1", question: "What is an online shopping cart used for?", options: ["To pay taxes", "To collect items a shopper intends to buy", "To print invoices only", "To store images"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "To collect items a shopper intends to buy" },
    { competency: "E-commerce", level: "A2", question: "Which payment method is commonly offered online?", options: ["Cash only", "Credit/debit card", "Barter", "Fax payment"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Credit/debit card" },
    { competency: "E-commerce", level: "B1", question: "What is SSL used for on e-commerce sites?", options: ["Faster loading", "Encrypting data in transit (HTTPS)", "Making images", "Calculating tax"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Encrypting data in transit (HTTPS)" },
    { competency: "E-commerce", level: "B2", question: "Which is an important page for trust on an online store?", options: ["Contact and returns policy", "Hidden terms", "Confusing checkout", "Broken links"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Contact and returns policy" },
    { competency: "E-commerce", level: "C1", question: "What is drop shipping?", options: ["A shipping company", "A fulfillment model where vendor ships directly to customers", "A payment gateway", "A tax rule"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "A fulfillment model where vendor ships directly to customers" },
    { competency: "E-commerce", level: "C2", question: "Which metric measures how many visitors become customers?", options: ["Conversion rate", "Load time", "CTR", "Impressions"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Conversion rate" },

    // Competency 21: Online Research
    { competency: "Online Research", level: "A1", question: "Which tool is commonly used to search for information online?", options: ["Search engine (e.g., Google)", "Calculator", "Text editor", "Video player"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Search engine (e.g., Google)" },
    { competency: "Online Research", level: "A2", question: "Which search technique narrows results using quotes?", options: ["Using @", "Using quotes around phrases", "Using #", "Using %"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Using quotes around phrases" },
    { competency: "Online Research", level: "B1", question: "Which source is generally more reliable for scientific facts?", options: ["Personal blog", "Peer-reviewed journal", "Random forum post", "Social post"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Peer-reviewed journal" },
    { competency: "Online Research", level: "B2", question: "What is a primary source?", options: ["A summary article", "Original material or direct evidence", "An opinion piece", "A translated text"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Original material or direct evidence" },
    { competency: "Online Research", level: "C1", question: "Which method helps verify online information credibility?", options: ["Check multiple reputable sources and author credentials", "Only trust one website", "Assume everything is true", "Use only social media"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Check multiple reputable sources and author credentials" },
    { competency: "Online Research", level: "C2", question: "What is the value of metadata in research datasets?", options: ["It stores images only", "It describes data context, structure, and provenance", "It compresses files", "It deletes duplicates"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "It describes data context, structure, and provenance" },

    // Competency 22: Problem Solving with Technology
    { competency: "Problem Solving with Technology", level: "A1", question: "If an app is not responding, which basic step can you try first?", options: ["Restart the app", "Format the hard drive", "Open BIOS", "Rewrite code"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Restart the app" },
    { competency: "Problem Solving with Technology", level: "A2", question: "Which action often helps when a website won't load?", options: ["Check internet connection", "Change password", "Open a spreadsheet", "Unplug keyboard"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Check internet connection" },
    { competency: "Problem Solving with Technology", level: "B1", question: "When a printer fails to print, what is a useful troubleshooting step?", options: ["Check paper and ink/toner levels and restart printer", "Buy a new printer immediately", "Open presentation software", "Delete system32"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Check paper and ink/toner levels and restart printer" },
    { competency: "Problem Solving with Technology", level: "B2", question: "What is useful to collect when reporting a software bug?", options: ["Only the app name", "Steps to reproduce, screenshots, and error messages", "Your favorite color", "A random file"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Steps to reproduce, screenshots, and error messages" },
    { competency: "Problem Solving with Technology", level: "C1", question: "Which approach is best for isolating the cause of a network problem?", options: ["Replace hardware randomly", "Use systematic testing (ping/traceroute, check configs)", "Reinstall OS daily", "Ignore logs"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Use systematic testing (ping/traceroute, check configs)" },
    { competency: "Problem Solving with Technology", level: "C2", question: "Which practice improves long-term problem handling in IT teams?", options: ["No documentation", "Maintain knowledge base with root-cause analysis and fixes", "Only verbal info", "Immediate hardware replacement only"], createdBy: "6897a2f54dbc450dc1065521", correctAnswer: "Maintain knowledge base with root-cause analysis and fixes" }
];

export async function seedQuestions() {
    try {
        console.log("✅ Connected to MongoDB");

        // Optional: clear existing questions (uncomment if desired)
        // await Question.deleteMany({});

        // Insert - but avoid duplicating if running multiple times:
        // We'll insert only if collection is empty or not already seeded.
        const count = await Question.countDocuments();
        if (count === 0) {
            await Question.insertMany(questions);
            console.log(`✅ Inserted ${questions.length} questions`);
        } else {
            console.log(`ℹ️ Questions collection has ${count} documents — skipping insert to avoid duplicates.`);
            console.log("If you want to reseed, delete existing questions or uncomment deleteMany in the script.");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding questions:", error);
        process.exit(1);
    }
}

// seedQuestions();
