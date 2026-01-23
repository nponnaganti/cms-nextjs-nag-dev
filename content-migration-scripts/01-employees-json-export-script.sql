DROP TABLE IF EXISTS employee;
-- create table
CREATE TABLE employee (
    employeeid INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dateofjoining DATE NOT NULL,
    isaccountlocked BIT NOT NULL DEFAULT 0
);
-- insert data for FOUR different CMS fields : Number, Text, Date, Checkbox
INSERT INTO employee (employeeid, name, dateofjoining, isaccountlocked) VALUES
(101, 'nag A', '2019-01-01', 1),
(102, 'nag B', '2020-02-02', 0),
(103, 'nag C', '2021-03-03', 1),
(104, 'nag D', '2022-04-04', 0),
(105, 'nag E', '2023-05-05', 1),
(106, 'nag F', '2024-06-06', 0),
(107, 'nag G', '2025-07-07', 1),
(108, 'nag H', '2026-08-08', 0);
-- select data
SELECT * FROM employee ORDER BY employeeid;
-- =============================================================================
-- Next Steps: Export this data as JSON
-- =============================================================================
SELECT
    -1 AS contentID,
    JSON_QUERY((
        SELECT
            1 AS state, 
            'Employees' AS referenceName,
            'Employee' AS definitionName,
            0 AS itemOrder
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    )) AS properties,
    JSON_QUERY((
        SELECT          
            CAST(employeeid AS VARCHAR(50)) AS employeeId,
            name AS name,
            dateofjoining AS dateOfJoining,
            isaccountlocked AS isAccountLocked
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    )) AS fields
FROM employee
FOR JSON PATH;
-- =================================================================================
-- Next Steps: BULK Import to Agility CMS via Agility Management API
-- =================================================================================
-- Agility CMS Content Metadata Reference
-- =================================================================================
-- state values: 0 = Draft, 1 = Review, 2 = Published, 3 = Archived
-- referenceName: grouping name in Agility CMS (e.g. Employees)
-- definitionName: content model name(data template) in Agility CMS (e.g. Employee)
-- =================================================================================