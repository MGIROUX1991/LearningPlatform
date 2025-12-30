import { useState } from 'react';
import { BookOpen, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { QUEBEC_CURRICULUM, getMandatorySubjects } from '../data/quebecCurriculum';

const CurriculumOverview = () => {
  const [selectedYear, setSelectedYear] = useState('Secondary I');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const years = ['Secondary I', 'Secondary II', 'Secondary III', 'Secondary IV', 'Secondary V'];
  const mandatorySubjects = getMandatorySubjects(selectedYear);

  const getSubjectIcon = (category) => {
    switch (category) {
      case 'language':
        return '📚';
      case 'stem':
        return '🔬';
      case 'social':
        return '🌍';
      case 'arts':
        return '🎨';
      case 'health':
        return '💪';
      case 'practical':
        return '💰';
      default:
        return '📖';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <GraduationCap className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold text-white">
            Programme de Formation Québécois
          </h1>
        </div>
        <p className="text-gray-300">
          Curriculum officiel du Ministère de l'Éducation du Québec
        </p>
      </div>

      {/* Year Selector */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Sélectionner une année</h2>
        <div className="grid grid-cols-5 gap-3">
          {years.map((year) => {
            const isCycleOne = ['Secondary I', 'Secondary II'].includes(year);
            return (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedSubject(null);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white'
                    : isCycleOne
                    ? 'bg-blue-600/20 border-blue-500/50 text-white hover:bg-blue-600/30'
                    : 'bg-green-600/20 border-green-500/50 text-white hover:bg-green-600/30'
                }`}
              >
                <div className="font-semibold">{year}</div>
                <div className="text-xs mt-1 opacity-80">
                  {isCycleOne ? 'Cycle 1' : 'Cycle 2'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Subjects */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Matières obligatoires - {selectedYear}
          </h2>
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="w-5 h-5" />
            <span>{mandatorySubjects.reduce((sum, s) => {
              return sum + (s.yearData?.hours || 0);
            }, 0)} heures totales</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mandatorySubjects.map((subject) => {
            const yearData = subject.yearData;
            const isGraduationReq = QUEBEC_CURRICULUM.graduationRequirements.mandatoryCourses.some(
              req => req.subject === subject.id && req.level === selectedYear
            );

            return (
              <div
                key={subject.id}
                onClick={() => setSelectedSubject(selectedSubject?.id === subject.id ? null : subject)}
                className={`bg-white/5 hover:bg-white/10 rounded-xl p-6 border-2 cursor-pointer transition-all ${
                  selectedSubject?.id === subject.id
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{getSubjectIcon(subject.category)}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{subject.name}</h3>
                      <p className="text-sm text-gray-400">{subject.englishName}</p>
                    </div>
                  </div>
                  {isGraduationReq && (
                    <div className="bg-yellow-500/20 px-2 py-1 rounded text-xs text-yellow-300">
                      Diplôme
                    </div>
                  )}
                </div>

                {yearData && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Heures:</span>
                      <span className="text-white font-semibold">{yearData.hours || yearData.hours} h</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Crédits:</span>
                      <span className="text-white font-semibold">{yearData.credits || yearData.credits} crédits</span>
                    </div>
                  </div>
                )}

                {selectedSubject?.id === subject.id && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-3">Compétences:</h4>
                    <div className="space-y-2">
                      {subject.competencies.map((comp) => (
                        <div key={comp.id} className="bg-white/5 rounded p-3">
                          <div className="text-white font-medium text-sm">{comp.name}</div>
                          <div className="text-gray-400 text-xs mt-1">{comp.description}</div>
                          <div className="mt-2 space-y-1">
                            {comp.skills.map((skill, idx) => (
                              <div key={idx} className="text-xs text-gray-500 flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Graduation Requirements */}
      <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border-2 border-green-500/50">
        <div className="flex items-center space-x-2 mb-4">
          <GraduationCap className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Exigences de Diplôme</h2>
        </div>
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="text-gray-300 mb-2">
            Pour obtenir un diplôme d'études secondaires, les étudiants doivent:
          </p>
          <ul className="list-disc list-inside space-y-1 text-white">
            <li>Obtenir au moins <strong>54 crédits</strong> en Secondaire IV et V</li>
            <li>Dont au moins <strong>20 crédits</strong> doivent être au niveau Secondaire V</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold">Cours obligatoires pour le diplôme:</h3>
          {QUEBEC_CURRICULUM.graduationRequirements.mandatoryCourses.map((req, idx) => {
            const subject = QUEBEC_CURRICULUM.subjects[req.subject];
            return (
              <div key={idx} className="bg-white/5 rounded p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">
                      {subject?.name || req.subject} - {req.level}
                    </div>
                    {req.note && (
                      <div className="text-gray-400 text-sm">{req.note}</div>
                    )}
                  </div>
                </div>
                <div className="text-green-300 font-semibold">{req.credits} crédits</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurriculumOverview;

