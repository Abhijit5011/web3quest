<<<<<<< HEAD
import React, { useState, useEffect, Fragment } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
import { db } from '@/src/services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '@/src/hooks/useUser';
import { lessons, Lesson } from '@/src/utils/lessons';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { QuestionCard } from '@/src/components/ui/QuestionCard';
import { motion, AnimatePresence } from 'motion/react';
<<<<<<< HEAD
import { CheckCircle, Lock, Play, ArrowLeft, ArrowRight, MousePointer2, BookOpen } from 'lucide-react';
import { cn } from '@/src/utils/utils';
import { unlockAchievement } from '@/src/services/achievementsService';
import { Web3TaskRegistry } from '@/src/components/web3-tasks/TaskRegistry';
import { fetchLessonCompletionFromDb, type LessonCompletionDbInfo } from '@/src/services/progressDbService';
import { LessonPreface } from '@/src/components/learn/LessonPreface';
import { LessonTaskVerificationProvider, useLessonTaskVerification } from '@/src/contexts/LessonTaskVerificationContext';

type StudyPhase = 'theory_quiz' | 'quiz' | 'theory_task' | 'task' | 'complete';

type CompleteOptions = { fromTask?: boolean; taskOk?: boolean };
=======
import { CheckCircle, Lock, Play, ArrowLeft, ArrowRight, Sparkles, Wallet } from 'lucide-react';
import { cn } from '@/src/utils/utils';
import { unlockAchievement } from '@/src/services/achievementsService';
import { Web3TaskRegistry } from '@/src/components/web3-tasks/TaskRegistry';
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949

export default function Learn() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { user, setUser } = useUser();
<<<<<<< HEAD
  const [studyPhase, setStudyPhase] = useState<StudyPhase>('theory_quiz');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [isLocked, setIsLocked] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [completionDbInfo, setCompletionDbInfo] = useState<LessonCompletionDbInfo | null>(null);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedLesson) return;
    setStudyPhase('theory_quiz');
    setCurrentQuestionIdx(0);
    setSelectedAnswer(undefined);
    setIsLocked(false);
    setLessonComplete(false);
    setCompletionDbInfo(null);
    setCompletedSteps([]);
  }, [selectedLesson?.id]);

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
=======
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [isLocked, setIsLocked] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter(s => s !== idx));
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

<<<<<<< HEAD
  const handleCompleteLesson = async (options?: CompleteOptions) => {
    if (!user || !selectedLesson) return;
    if (selectedLesson.web3Task && options?.fromTask && !options.taskOk) return;

    const isAlreadyCompleted = user.completed_lessons?.includes(selectedLesson.id) || false;
    const newCompleted = isAlreadyCompleted ? user.completed_lessons || [] : [...(user.completed_lessons || []), selectedLesson.id];

=======
  const isTaskReady = !selectedLesson?.web3Task || completedSteps.length === selectedLesson.web3Task.steps.length;

  const handleCompleteLesson = async () => {
    if (!user || !selectedLesson) return;
    
    const isAlreadyCompleted = user.completed_lessons?.includes(selectedLesson.id) || false;
    const newCompleted = isAlreadyCompleted 
      ? (user.completed_lessons || []) 
      : [...(user.completed_lessons || []), selectedLesson.id];
    
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
    const xpReward = isAlreadyCompleted ? 0 : 100;
    const newXp = user.xp + xpReward;
    const newLevel = Math.floor(newXp / 1000) + 1;

    try {
      const userDocRef = doc(db, 'users', user.id);
<<<<<<< HEAD
      await updateDoc(userDocRef, {
        completed_lessons: newCompleted,
        xp: newXp,
        level: newLevel,
      });

=======
      await updateDoc(userDocRef, { 
        completed_lessons: newCompleted,
        xp: newXp,
        level: newLevel
      });
      
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
      setUser({
        ...user,
        completed_lessons: newCompleted,
        xp: newXp,
<<<<<<< HEAD
        level: newLevel,
      });
      setLessonComplete(true);
      setStudyPhase('complete');
      setCompletedSteps([]);

      const fromDb = await fetchLessonCompletionFromDb(user.id, selectedLesson.id);
      setCompletionDbInfo(fromDb);

=======
        level: newLevel
      });
      setLessonComplete(true);
      setCompletedSteps([]); // Reset steps

      // Achievement Logic
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
      if (!isAlreadyCompleted) {
        if (newCompleted.length >= 3) {
          await unlockAchievement(user.id, 'web3-beginner');
        }
        if (newCompleted.length >= 10) {
<<<<<<< HEAD
          await unlockAchievement(user.id, 'streak-7');
=======
          await unlockAchievement(user.id, 'streak-7'); // Using this for 10 modules
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
        }
        if (selectedLesson.web3Task?.type === 'swap') {
          await unlockAchievement(user.id, 'first-swap');
        }
        if (selectedLesson.web3Task?.type === 'mint') {
          await unlockAchievement(user.id, 'nft-creator');
        }
      }
<<<<<<< HEAD

      window.location.reload();
=======
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  if (selectedLesson) {
    const question = selectedLesson.questions[currentQuestionIdx];
<<<<<<< HEAD
    const nQ = selectedLesson.questions.length;
    let progress = 5;
    if (studyPhase === 'theory_quiz') progress = 8;
    else if (studyPhase === 'quiz') {
      const answeredWeight = currentQuestionIdx + (isLocked ? 1 : 0);
      progress = 12 + Math.round((answeredWeight / Math.max(nQ, 1)) * 55);
    } else if (studyPhase === 'theory_task') progress = 78;
    else if (studyPhase === 'task') progress = 92;
    else if (studyPhase === 'complete') progress = 100;

    return (
      <div className="max-w-6xl mx-auto px-5 py-10 sm:px-8 sm:py-12">
        <Button variant="ghost" className="mb-6 -ml-1 pl-1 text-slate-500 hover:bg-transparent hover:text-slate-900" onClick={() => setSelectedLesson(null)}>
          <ArrowLeft size={18} className="mr-2" /> Curriculum
        </Button>

        <header className="mb-8 border-b border-slate-200/80 pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Module</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{selectedLesson.title}</h1>
          <div className="mt-4 flex items-center justify-between gap-4">
            <ProgressBar progress={progress} color="bg-indigo-600" className="h-1.5 flex-1 rounded-full" />
            <span className="text-xs font-medium tabular-nums text-slate-400">{progress}%</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {studyPhase === 'theory_quiz' && !lessonComplete ? (
            <motion.div key="tq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-8">
              <LessonPreface lesson={selectedLesson} />
              <Button className="w-full rounded-xl py-6 text-[15px] font-medium" size="lg" onClick={() => setStudyPhase('quiz')}>
                Continue to quiz <ArrowRight size={18} className="ml-2 opacity-80" />
              </Button>
            </motion.div>
          ) : studyPhase === 'quiz' && !lessonComplete ? (
            <motion.div key={`quiz-${currentQuestionIdx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
=======
    const progress = ((currentQuestionIdx + (showTask ? 1 : 0)) / (selectedLesson.questions.length + (selectedLesson.web3Task ? 1 : 0))) * 100;

    return (
      <div className="max-w-4xl mx-auto px-8 py-12">
        <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent text-brand-text-muted hover:text-brand-ink" onClick={() => setSelectedLesson(null)}>
          <ArrowLeft size={18} className="mr-2" /> Back to Curriculum
        </Button>

        <div className="mb-12 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-brand-ink">{selectedLesson.title}</h1>
              <p className="text-brand-text-muted mt-1">{selectedLesson.description}</p>
            </div>
            <div className="text-[10px] font-bold text-brand-text-muted tracking-widest">{Math.round(progress)}% COMPLETE</div>
          </div>
          <ProgressBar progress={progress} color="bg-brand-primary" className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {!showTask && !lessonComplete ? (
            <motion.div
              key={currentQuestionIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
              <QuestionCard
                question={question.question}
                options={question.options}
                onSelect={(idx) => {
                  setSelectedAnswer(idx);
                  setIsLocked(true);
                }}
                selectedIdx={selectedAnswer}
                correctIdx={isLocked ? question.correctIndex : undefined}
                isLocked={isLocked}
              />
<<<<<<< HEAD

              {isLocked && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 p-6">
                  <p className="text-sm leading-relaxed text-slate-700">{question.explanation}</p>
                  <Button
                    className="mt-5 w-full rounded-xl py-5 text-[15px] font-medium"
                    onClick={() => {
                      if (selectedLesson && currentQuestionIdx < selectedLesson.questions.length - 1) {
                        setCurrentQuestionIdx((prev) => prev + 1);
                        setSelectedAnswer(undefined);
                        setIsLocked(false);
                      } else if (selectedLesson?.web3Task) {
                        setStudyPhase('theory_task');
                      } else {
                        handleCompleteLesson(undefined);
                      }
                    }}
                  >
                    Continue <ArrowRight size={18} className="ml-2 opacity-80" />
=======
              
              {isLocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-white rounded-xl border border-brand-border shadow-sm"
                >
                  <p className="text-sm font-medium text-brand-ink">{question.explanation}</p>
                  <Button className="mt-6 w-full py-6 text-base" onClick={() => {
                    if (selectedLesson && currentQuestionIdx < selectedLesson.questions.length - 1) {
                      setCurrentQuestionIdx(prev => prev + 1);
                      setSelectedAnswer(undefined);
                      setIsLocked(false);
                    } else if (selectedLesson?.web3Task && !showTask) {
                      setShowTask(true);
                    } else {
                      handleCompleteLesson();
                    }
                  }}>
                    Continue <ArrowRight size={18} className="ml-2" />
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
                  </Button>
                </motion.div>
              )}
            </motion.div>
<<<<<<< HEAD
          ) : studyPhase === 'theory_task' && !lessonComplete ? (
            <motion.div key="theory-task" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-6">
              <Card className="border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2 text-slate-800">
                  <BookOpen className="size-5 text-indigo-600" strokeWidth={2} />
                  <h2 className="text-sm font-semibold tracking-wide">Before the hands-on task</h2>
                </div>
                <div className="text-[15px] leading-relaxed text-slate-600 whitespace-pre-wrap">
                  {selectedLesson.theoryBeforeTask || selectedLesson.theoryBeforeQuiz}
                </div>
              </Card>
              <Button className="w-full rounded-xl py-6 text-[15px] font-medium" size="lg" onClick={() => setStudyPhase('task')}>
                Open task <ArrowRight size={18} className="ml-2 opacity-80" />
              </Button>
            </motion.div>
          ) : studyPhase === 'task' && !lessonComplete ? (
            <Fragment key={`${selectedLesson.id}-task`}>
              <LessonTaskVerificationProvider>
                <LearnHandsOnTask
                  selectedLesson={selectedLesson}
                  completedSteps={completedSteps}
                  toggleStep={toggleStep}
                  onCompleteLesson={handleCompleteLesson}
                />
              </LessonTaskVerificationProvider>
            </Fragment>
          ) : (
            <motion.div key="complete" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle size={36} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Lesson complete</h2>
              <p className="mt-2 text-sm text-slate-500">+100 XP added to your profile.</p>
              {completionDbInfo && (
                <p className="mx-auto mt-6 max-w-sm text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{completionDbInfo.username}</span> — module{' '}
                  <span className="font-medium text-slate-900">{completionDbInfo.moduleName}</span>
                </p>
              )}
              <Button size="lg" className="mt-10 rounded-xl px-8 font-medium" variant="default" onClick={() => setSelectedLesson(null)}>
                Back to curriculum
              </Button>
=======
          ) : showTask && !lessonComplete ? (
            <motion.div
               key="task"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
            >
               <Card className="p-10 border-2 border-dashed border-indigo-200 bg-indigo-50/20 shadow-inner">
                  <div className="flex items-center gap-3 mb-6 text-brand-primary">
                    <Sparkles size={28} className="animate-pulse" />
                    <h2 className="text-xl font-black uppercase tracking-widest">Web3 Mission</h2>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-brand-ink">{selectedLesson.web3Task?.title}</h3>
                  <p className="text-lg text-brand-text-muted mb-10 leading-relaxed">{selectedLesson.web3Task?.description}</p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-4">Step-by-Step Instructions</div>
                    {selectedLesson.web3Task?.steps.map((step, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => toggleStep(idx)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer",
                          completedSteps.includes(idx) 
                            ? "bg-green-50 border-brand-success text-brand-ink" 
                            : "bg-white border-brand-border hover:border-indigo-200"
                        )}
                      >
                         <div className={cn(
                           "w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors",
                           completedSteps.includes(idx) ? "bg-brand-success border-brand-success text-white" : "border-gray-200"
                         )}>
                            {completedSteps.includes(idx) && <CheckCircle size={14} />}
                         </div>
                         <span className="text-sm font-semibold">{step}</span>
                      </div>
                    ))}
                  </div>

                  {selectedLesson.web3Task && Web3TaskRegistry[selectedLesson.web3Task.type] && (
                    <div className="mb-10 p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                       {(() => {
                         const TaskComponent = Web3TaskRegistry[selectedLesson.web3Task.type];
                         return <TaskComponent />;
                       })()}
                    </div>
                  )}

                  <div className="bg-white p-10 rounded-2xl border border-indigo-100 shadow-xl text-center">
                     <div className="w-16 h-16 bg-indigo-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <Wallet size={32} />
                     </div>
                     <p className={cn(
                       "text-xs font-bold mb-6 uppercase tracking-widest",
                       isTaskReady ? "text-brand-success" : "text-brand-text-muted opacity-50"
                     )}>
                        {isTaskReady ? 'System Ready: Proceed to Execution' : `Complete ${selectedLesson.web3Task?.steps.length! - completedSteps.length} more steps`}
                     </p>
                     <Button 
                      size="xl" 
                      className="w-full md:w-auto px-16 shadow-lg shadow-indigo-200" 
                      onClick={() => handleCompleteLesson()}
                      disabled={!isTaskReady}
                    >
                        Execute Mission
                     </Button>
                  </div>
               </Card>
            </motion.div>
          ) : (
            <motion.div
               key="complete"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-20"
            >
               <div className="w-24 h-24 bg-brand-success/10 text-brand-success rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <CheckCircle size={48} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-brand-success/20 rounded-full"
                  />
               </div>
               <h2 className="text-5xl font-black mb-3 uppercase tracking-tighter text-brand-ink">Lesson Complete!</h2>
               <p className="text-lg text-brand-text-muted mb-12">+100 XP awarded to your profile</p>
               <Button size="xl" className="px-12 py-8 text-xl rounded-2xl" onClick={() => setSelectedLesson(null)}>
                  Keep Exploring
               </Button>
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const handleUnlock = async (lesson: Lesson, cost: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user || user.xp < cost) return;

    try {
      const userDocRef = doc(db, 'users', user.id);
      const newUnlocked = [...(user.unlocked_modules || []), lesson.id];
      const newXp = user.xp - cost;

<<<<<<< HEAD
      await updateDoc(userDocRef, {
        unlocked_modules: newUnlocked,
        xp: newXp,
      });

      setUser({
        ...user,
        unlocked_modules: newUnlocked,
        xp: newXp,
=======
      await updateDoc(userDocRef, { 
        unlocked_modules: newUnlocked,
        xp: newXp
      });
      
      setUser({
        ...user,
        unlocked_modules: newUnlocked,
        xp: newXp
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
      });
    } catch (err) {
      console.error('Error unlocking module:', err);
    }
  };

  return (
<<<<<<< HEAD
    <div className="mx-auto max-w-[880px] px-5 py-14 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Curriculum</h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">Unlock modules with XP. Lessons with a hands-on task are highlighted.</p>

      <div className="mt-10 space-y-3">
        {lessons.map((lesson, idx) => {
          const isCompleted = user?.completed_lessons?.includes(lesson.id) || false;
          const isUnlocked = user?.unlocked_modules?.includes(lesson.id) || idx < 3;
          const unlockCost = 25 + idx * 25;
          const hasHandsOn = Boolean(lesson.web3Task);
=======
    <div className="max-w-[1000px] mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2 text-brand-ink">Curriculum</h1>
      <p className="text-brand-text-muted mb-12">Spend XP to unlock advanced Web3 topics and continue your journey.</p>

      <div className="space-y-4">
        {lessons.map((lesson, idx) => {
          const isCompleted = user?.completed_lessons?.includes(lesson.id) || false;
          const isUnlocked = user?.unlocked_modules?.includes(lesson.id) || idx < 3;
          const unlockCost = 25 + (idx * 25); // Made lower for easier access
          const isInteractive = Boolean(lesson.web3Task);
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949

          return (
            <Card
              key={lesson.id}
              className={cn(
<<<<<<< HEAD
                'p-0 overflow-hidden transition-shadow',
                !isUnlocked ? 'border-slate-200/90 bg-slate-50/50' : 'cursor-pointer border-slate-200 bg-white hover:shadow-md',
                isUnlocked && hasHandsOn && 'ring-2 ring-indigo-200/90 ring-offset-2 ring-offset-slate-50'
              )}
              onClick={() => isUnlocked && setSelectedLesson(lesson)}
            >
              <div className="flex flex-col sm:flex-row">
                <div
                  className={cn(
                    'flex w-full shrink-0 items-center justify-center py-8 sm:w-28 sm:py-0',
                    isCompleted ? 'bg-emerald-50 text-emerald-600' : !isUnlocked ? 'bg-slate-100 text-slate-400' : hasHandsOn ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'
                  )}
                >
                  {isCompleted ? <CheckCircle size={28} strokeWidth={2} /> : !isUnlocked ? <LockIcon size={28} /> : <Play size={26} className="ml-0.5" fill="currentColor" />}
                </div>
                <div className="flex flex-1 flex-col justify-center gap-3 border-t border-slate-100 p-6 sm:border-t-0 sm:border-l sm:pl-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={cn('text-lg font-semibold', isUnlocked ? 'text-slate-900' : 'text-slate-400')}>{lesson.title}</h3>
                    {hasHandsOn && isUnlocked && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        <MousePointer2 className="size-3" strokeWidth={2.5} />
                        Hands-on
                      </span>
                    )}
                    {isCompleted && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">Done</span>
                    )}
                    {!isUnlocked && <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">Locked</span>}
                  </div>
                  <p className={cn('text-sm leading-relaxed', isUnlocked ? 'text-slate-500' : 'text-slate-400')}>{lesson.description}</p>
                  {!isUnlocked && (
                    <div className="pt-1">
                      <Button
                        variant={user && user.xp >= unlockCost ? 'default' : 'outline'}
                        size="sm"
                        disabled={!user || user.xp < unlockCost}
                        className="rounded-lg font-medium"
                        onClick={(e) => handleUnlock(lesson, unlockCost, e)}
                      >
                        Unlock · {unlockCost} XP
                      </Button>
                    </div>
                  )}
                </div>
=======
                "p-0 overflow-hidden flex flex-col md:flex-row group relative",
                !isUnlocked
                  ? "bg-gray-50/80"
                  : isInteractive
                    ? "hover:border-indigo-400 border-indigo-200/70 bg-indigo-50/20 transition-all cursor-pointer"
                    : "hover:border-brand-primary transition-all cursor-pointer"
              )}
              onClick={() => isUnlocked && setSelectedLesson(lesson)}
            >
              <div className={cn(
                "w-full md:w-32 flex items-center justify-center py-10 md:py-0 transition-colors",
                isCompleted
                  ? "bg-green-50 text-brand-success"
                  : !isUnlocked
                    ? "bg-gray-100 text-gray-400"
                    : isInteractive
                      ? "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100"
                      : "bg-gray-50 text-brand-ink group-hover:bg-indigo-50 group-hover:text-brand-primary"
              )}>
                {isCompleted ? <CheckCircle size={32} /> : !isUnlocked ? <LockIcon size={32} /> : <Play size={32} fill="currentColor" />}
              </div>
              <div className="p-8 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                     <h3 className={cn("text-xl font-bold", isUnlocked ? "text-brand-ink" : "text-gray-400")}>{lesson.title}</h3>
                     {isCompleted && (
                       <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-sm">Finished</span>
                     )}
                     {!isUnlocked && (
                       <span className="text-[10px] bg-gray-200 text-gray-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-sm">Locked</span>
                     )}
                  </div>
                  <p className={cn("text-sm leading-relaxed", isUnlocked ? "text-brand-text-muted" : "text-gray-400")}>{lesson.description}</p>
                </div>
                
                {!isUnlocked && (
                  <Button 
                    variant={user && user.xp >= unlockCost ? "default" : "outline"} 
                    disabled={!user || user.xp < unlockCost}
                    onClick={(e) => handleUnlock(lesson, unlockCost, e)}
                    className="whitespace-nowrap"
                  >
                    Unlock • {unlockCost} XP
                  </Button>
                )}
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

<<<<<<< HEAD
function LearnHandsOnTask({
  selectedLesson,
  completedSteps,
  toggleStep,
  onCompleteLesson,
}: {
  selectedLesson: Lesson;
  completedSteps: number[];
  toggleStep: (idx: number) => void;
  onCompleteLesson: (options?: CompleteOptions) => void | Promise<void>;
}) {
  const { taskVerified } = useLessonTaskVerification()!;
  const stepCount = selectedLesson.web3Task?.steps.length ?? 0;
  const stepsOk = stepCount === 0 || completedSteps.length === stepCount;
  const isTaskReady = stepsOk && taskVerified;

  return (
    <motion.div key="task" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            <MousePointer2 className="size-3.5" strokeWidth={2.5} />
            Hands-on task
          </span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{selectedLesson.web3Task?.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{selectedLesson.web3Task?.description}</p>

        <div className="mt-8 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Checklist</p>
          {selectedLesson.web3Task?.steps.map((step, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => toggleStep(idx)}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                completedSteps.includes(idx) ? 'border-emerald-200 bg-emerald-50/60 text-slate-900' : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border text-[10px] font-bold',
                  completedSteps.includes(idx) ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-slate-400'
                )}
              >
                {completedSteps.includes(idx) ? <CheckCircle size={12} strokeWidth={3} /> : idx + 1}
              </span>
              <span>{step}</span>
            </button>
          ))}
        </div>

        {selectedLesson.web3Task && Web3TaskRegistry[selectedLesson.web3Task.type] && (
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/30">
            {(() => {
              const TaskComponent = Web3TaskRegistry[selectedLesson.web3Task!.type];
              return <TaskComponent />;
            })()}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/50 p-6 text-center">
          <p className={cn('text-xs font-medium text-slate-500', isTaskReady && 'text-emerald-700')}>
            {!stepsOk && `Mark each step when finished (${completedSteps.length}/${stepCount}).`}
            {stepsOk && !taskVerified && 'Use the task panel above until verification succeeds (green success state).'}
            {isTaskReady && 'Checklist done and task verified — you can complete the lesson.'}
          </p>
          <Button
            size="lg"
            className="mt-4 rounded-xl px-10 font-medium"
            onClick={() => onCompleteLesson({ fromTask: true, taskOk: taskVerified })}
            disabled={!isTaskReady}
          >
            Complete lesson
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

const LockIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
=======
const LockIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
);
