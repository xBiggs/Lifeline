export interface QuestionResponse {
    question: string;
    choices: string[];
    points: 1 | 2;
    response?: string;
}

export const riskFactorQuestions: QuestionResponse[] = [
    // High Risk Factors Here
    {
        question: 'Do you have a history of nonlethal self-harm?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Do you have a history of suicide attempts?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Do you have a history of substance abuse?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Do you have any mental illnesses?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'What is your military service status?',
        choices: ['Active Duty', 'Veteran', 'Civilian'],
        points: 2,
    },
    {
        question: 'Do you own a firearm?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    // Low Risk Factors Here
];

export const mitigatingFactorQuestions: QuestionResponse[] = [
    // High Mitigating Factors Here
    {
        question: 'Do you have a sense of belonging?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Are you close with your family?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Do you feel like anyone supports you?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Do you play an active role in your community?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    {
        question: 'Do you have anything to live for?',
        choices: ['Yes', 'No'],
        points: 2,
    },
    // Low Mitigating Factors Here
    {
        question: 'Do you have a sense of resilience?',
        choices: ['Yes', 'No'],
        points: 1,
    },
    {
        question: 'Are you persistent?',
        choices: ['Yes', 'No'],
        points: 1,
    },
    {
        question: 'Do you have any future goals in life?',
        choices: ['Yes', 'No'],
        points: 1,
    },


];