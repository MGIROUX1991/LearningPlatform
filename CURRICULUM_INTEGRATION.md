# Quebec Curriculum Integration

## Overview

The platform now includes the complete official Quebec Education Program (Programme de formation de l'école québécoise) for Secondary 1-5 (Grades 7-11).

## Data Structure

All curriculum data is stored in `src/data/quebecCurriculum.js` and includes:

### Cycles
- **Cycle One**: Secondary I and II (Grades 7-8)
- **Cycle Two**: Secondary III, IV, and V (Grades 9-11)

### Mandatory Subjects

#### Cycle One (Secondary I & II)
1. **Français, langue d'instruction** - 400 hours, 16 credits
2. **English, Second Language** - 200 hours, 8 credits
3. **Mathématiques** - 300 hours, 12 credits
4. **Science et technologie** - 200 hours, 8 credits
5. **Géographie** - 150 hours, 6 credits
6. **Histoire et éducation à la citoyenneté** - 150 hours, 6 credits
7. **Arts** (Drama, Visual Arts, Dance, or Music) - 200 hours, 8 credits
8. **Éducation physique et à la santé** - 100 hours, 4 credits
9. **Culture et citoyenneté québécoise** - 100 hours, 4 credits

#### Cycle Two (Secondary III-V)
- **Language of Instruction**: 150h (III, IV), 200h (V) - 6-8 credits
- **Second Language**: 100h (III, IV), 150h (V) - 4-6 credits
- **Mathematics**: 150h (III), 100-150h (IV, V) - 4-6 credits
- **Science and Technology**: 150h (III), 100h (IV) - 4-6 credits
- **History and Citizenship Education**: 100h (III, IV) - 4 credits
- **Contemporary World**: 50-100h (V) - 2-4 credits
- **Arts Education**: 50h/year - 2 credits
- **Physical Education and Health**: 50h/year - 2 credits
- **Culture and Citizenship in Québec**: 50h (III), 100h (IV) - 2-4 credits
- **Financial Education**: 50h (IV) - 2 credits

## Competencies

Each subject includes detailed competencies with specific skills:

### Mathematics
- **Résoudre une situation-problème** (Solve situational problems)
- **Utiliser un raisonnement mathématique** (Use mathematical reasoning)
- **Communiquer à l'aide du langage mathématique** (Communicate using mathematical language)

### History
- **Caractériser une période de l'histoire** (Characterize a historical period)
- **Interpréter une réalité sociale** (Interpret a social reality)
- **Construire sa conscience citoyenne** (Construct citizenship consciousness)

### Languages (French/English)
- Reading comprehension and appreciation
- Writing various texts
- Oral communication

### Science
- Seek solutions to scientific problems
- Apply scientific knowledge
- Communicate using scientific language

## Graduation Requirements

To obtain a Secondary School Diploma (SSD), students must:

- Earn **at least 54 credits** at Secondary IV and V level
- **At least 20 credits** must be at Secondary V level

### Mandatory Courses for Diploma:
1. Secondary IV Mathematics (4-6 credits)
2. Secondary IV Science and Technology (4 credits)
3. Secondary IV History of Quebec and Canada (4 credits)
4. Secondary IV Arts Education (2 credits)
5. Secondary V Language of Instruction (6 credits)
6. Secondary V Second Language (4-6 credits)
7. Secondary V Physical Education and Health OR Ethics and Religious Culture (2 credits)

## Implementation

### Curriculum Overview Component
- Located at `/curriculum`
- Shows all mandatory subjects by year
- Displays competencies and skills for each subject
- Highlights graduation requirements

### Integration Points
- Dashboard now uses curriculum data to show all subjects
- Subject modules can reference curriculum competencies
- Progress tracking aligned with curriculum requirements

## Helper Functions

```javascript
// Get subject data for a specific year
getSubjectByYear(subjectId, year)

// Get all mandatory subjects for a year
getMandatorySubjects(year)

// Get graduation requirements
getGraduationRequirements()
```

## Next Steps

1. **Content Development**: Create lessons aligned with curriculum competencies
2. **Assessment**: Design assessments that evaluate curriculum skills
3. **Progress Tracking**: Track completion of curriculum requirements
4. **Credit System**: Implement credit tracking for graduation requirements
5. **Subject Modules**: Build out modules for all mandatory subjects

## Sources

- [Québec Education Program](https://www.quebec.ca/en/education/preschool-elementary-and-secondary-schools/quebec-education-program/secondary)
- [Basic school regulation](https://www.legisquebec.gouv.qc.ca/en/showdoc/cr/I-13.3,%20r.%208)
- [Administrative Guide - Graduation Requirements](https://cdn-contenu.quebec.ca/cdn-contenu/education/evaluation-epreuves-ministerielles/Guide-sanction-etudes-AN.pdf)

