import {
  Settings,
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  Link as LinkIcon,
  ToggleLeft,
  ToggleRight,
  Layers,
} from "lucide-react";
import type { Route } from "./+types/tutorials.optional-prompts";
import {
  GuideStepCard,
  TutorialHintCard,
  TutorialInlineCode,
  SimulationBadge,
  TutorialLinkCard,
} from "~/components/ui/tutorial";
import {
  TutorialPageHeader,
  TutorialPageShell,
  TutorialStepNavigator,
  type TutorialStepItem,
  useTutorialStepQuery,
  useTutorialTheme,
} from "~/components/ui/TutorialPageLayout";
import {
  STPanel,
  STNavbar,
  STLabel,
  STButton,
  STInput,
  STCheckbox,
  MockPromptListColumns,
  MockPromptListRow,
  MockPromptEditDialogActions,
  MockPromptEditDialogHeader,
} from "~/components/ui/tutorial-mock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "可选提示词 — 花瓣预设 Petals Preset" },
    {
      name: "description",
      content:
        "花瓣预设可选提示词教程 — 了解系统内置的可选提示词功能，按需启用禁词表、节奏控制、角色增强等行为调节模块。",
    },
  ];
}

/* ─────────────────── Prompt catalog data ─────────────────── */

const OPTIONAL_PROMPTS = [
  {
    emoji: "📍",
    label: "[禁词表] Avoid Cliché Expressions",
    enabled: true,
    desc: "列出需要避免的陈词滥调与固定表达，让 AI 保持新鲜的用词。",
    tip: "可在「修改禁词表」教程中自定义禁用词汇。",
    tipLink: "/tutorials/banned-words",
    tipLinkLabel: "查看修改禁词表教程",
  },
  {
    emoji: "📍",
    label: "[防软道歉] Avoid Evading",
    enabled: true,
    desc: "禁止以审查敏感内容或由回避负面情节，确保叙事连贯推进。",
  },
  {
    emoji: "📍",
    label: "[角色增强] Character Enhancement",
    enabled: true,
    desc: "引导 AI 深入思考角色的内在核心、外在特质、背景故事与人际关系，强化角色塑造深度。",
  },
  {
    emoji: "📍",
    label: "[慢推进] Pacing Control",
    enabled: true,
    desc: "控制叙述节奏，聚焦当下场景细节，避免在单次回复中推进过多剧情。",
  },
  {
    emoji: "📍",
    label: "[防升华] No Wrap-up",
    enabled: false,
    desc: "禁止在输出末尾进行总结、升华或点题，保持场景沉浸感。",
  },
  {
    emoji: "📍",
    label: "[抢话] Narrative Proactivity",
    enabled: false,
    desc: "鼓励 AI 主动推断并编写 Player Character 的行为，加速叙事推进。",
    conflict: "与「防抢话」互斥，请勿同时启用。",
  },
  {
    emoji: "📍",
    label: "[防抢话] Narrative Boundaries",
    enabled: false,
    desc: "严格禁止输出中包含 Player Character 的任何行为描写，保持玩家主导权。",
    conflict: "与「抢话」互斥，请勿同时启用。",
  },
  {
    emoji: "📍",
    label: "[平和化] Emotional Stability",
    enabled: false,
    desc: "防止角色情绪过于激烈，避免纯粹为戏剧效果而产生不符合人设的极端情绪。",
  },
  {
    emoji: "📍",
    label: "[CoT 兼容] CoT Compatibility",
    enabled: false,
    desc: "检测角色卡或上下文中是否要求输出显式思维结构，并按要求在正文前插入对应结构。",
    tip: "仅在角色卡包含 CoT 时开启；若角色卡无 CoT 要求，应保持关闭。",
  },
  {
    emoji: "📍",
    label: "[格式增强] Output Structure Reinforcement",
    enabled: false,
    desc: "强化对上下文结构要求的识别，尽量避免漏掉状态栏、变量更新、选项等固定格式内容。",
    tip: "仅在出现掉格式时开启；输出结构正确时建议关闭。",
  },
  {
    emoji: "📍",
    label: "[防发情] NSFW Contextual Protocol",
    enabled: false,
    desc: "禁止角色在日常场景中满脑子色色，NSFW 场景的触发必须符合设定与故事进展。",
    conflict: "与「色色加速」互斥，请勿同时启用。",
  },
  {
    emoji: "📍",
    label: "[色色加速] NSFW Narrative Mode",
    enabled: false,
    desc: "鼓励在任何合适时机主动进入 NSFW 场景。",
    conflict: "与「防发情」互斥，请勿同时启用。",
  },
];

/* ─────────────────── Step 1: 了解可选提示词 ─────────────────── */

function StepOverview({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="什么是可选提示词"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              可选提示词是花瓣预设内置的行为调节模块，每个模块对应一种特定的行为指南或约束。你可以根据当前创作需求，
              <span className="font-semibold">按需启用或禁用</span>
              ，无需手动编写提示词内容。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="在哪里找到它们"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              可选提示词位于提示词列表的{" "}
              <TutorialInlineCode isDark={isDark}>
                == 指南（可自定义）==
              </TutorialInlineCode>{" "}
              栏下方，以{" "}
              <TutorialInlineCode isDark={isDark} tone="pink">
                📍
              </TutorialInlineCode>{" "}
              开头标识。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="如何启用 / 禁用"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击条目右侧的{" "}
              <span className="font-semibold inline-flex items-center gap-1">
                <ToggleRight size={14} className="inline" />
                开关
              </span>{" "}
              即可切换启用状态。启用后记得{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#f472b6" : "#db2777" }}
              >
                保存预设
              </span>
              ，否则刷新后设置会丢失。
            </>
          }
          tip="部分提示词互斥（如「抢话」与「防抢话」），请勿同时启用。"
        />
      </div>

      {/* Right: prompt list preview */}
      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="提示词列表" />

        <STNavbar
          activeIndex={0}
          highlightIndex={0}
          highlightColor="red"
          isDark={isDark}
        />

        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between mb-2">
            <STLabel isDark={isDark}>提示词</STLabel>
            <span
              className="text-xs"
              style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
            >
              总词符数：0
            </span>
          </div>

          <MockPromptListColumns isDark={isDark} />

          <div className="space-y-1.5">
            <MockPromptListRow
              isDark={isDark}
              emoji=""
              label="== 指南（可自定义）=="
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              emoji="🌸"
              label="Freesia"
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[禁词表] Avoid Cliché Expr…"
              enabled={true}
              highlight={true}
              toggleHighlightTooltip="点击切换启用状态"
              highlightEnabledToggleTone="pink"
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[防软道歉] Avoid Evading"
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[角色增强] Character Enhancement"
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[慢推进] Pacing Control"
              enabled={true}
            />
          </div>
        </div>
      </STPanel>
    </div>
  );
}

/* ─────────────────── Step 2: 功能说明 ─────────────────── */

function PromptCard({
  isDark,
  emoji,
  label,
  desc,
  tip,
  tipLink,
  tipLinkLabel,
  conflict,
  defaultEnabled,
}: {
  isDark: boolean;
  emoji: string;
  label: string;
  desc: string;
  tip?: string;
  tipLink?: string;
  tipLinkLabel?: string;
  conflict?: string;
  defaultEnabled: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 space-y-2 transition-all duration-200"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(15,12,24,0.7), rgba(26,22,37,0.5))"
          : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.6))",
        border: isDark
          ? "1px solid rgba(147,51,234,0.15)"
          : "1px solid rgba(147,51,234,0.1)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <span
            className="text-xs font-mono font-bold shrink-0 mt-0.5"
            style={{ color: isDark ? "#f9a8d4" : "#db2777" }}
          >
            {emoji}
          </span>
          <span
            className="text-sm font-semibold leading-snug"
            style={{ color: isDark ? "#e5e7eb" : "#1e293b" }}
          >
            {label}
          </span>
        </div>
        <div className="shrink-0 mt-0.5">
          {defaultEnabled ? (
            <ToggleRight
              size={20}
              style={{ color: isDark ? "#a855f7" : "#9333ea" }}
            />
          ) : (
            <ToggleLeft
              size={20}
              style={{ color: isDark ? "#4b5563" : "#94a3b8" }}
            />
          )}
        </div>
      </div>

      <p
        className="text-xs leading-relaxed pl-5"
        style={{ color: isDark ? "#9ca3af" : "#64748b" }}
      >
        {desc}
      </p>

      {conflict && (
        <p
          className="text-[11px] font-medium pl-5"
          style={{ color: isDark ? "#fbbf24" : "#d97706" }}
        >
          ⚠ {conflict}
        </p>
      )}

      {tip && (
        <div
          className="ml-5 px-3 py-2 rounded-lg text-xs leading-relaxed"
          style={{
            background: isDark
              ? "rgba(236,72,153,0.08)"
              : "rgba(236,72,153,0.05)",
            border: isDark
              ? "1px solid rgba(236,72,153,0.2)"
              : "1px solid rgba(236,72,153,0.12)",
            color: isDark ? "#f9a8d4" : "#be185d",
          }}
        >
          {tip}
          {tipLink && (
            <>
              {" "}
              <a
                href={tipLink}
                className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
              >
                {tipLinkLabel ?? "查看教程"}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function StepCatalog({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-6">
      <div
        className="rounded-xl p-4 text-sm leading-relaxed"
        style={{
          background: isDark
            ? "rgba(147,51,234,0.06)"
            : "rgba(147,51,234,0.04)",
          border: isDark
            ? "1px solid rgba(147,51,234,0.15)"
            : "1px solid rgba(147,51,234,0.08)",
          color: isDark ? "#cbd5e1" : "#475569",
        }}
      >
        以下是花瓣预设内置的全部可选提示词。
        <span
          className="font-semibold"
          style={{ color: isDark ? "#a855f7" : "#7e22ce" }}
        >
          {" "}
          默认开启
        </span>
        的条目已预先启用，你可以根据需要随时调整。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {OPTIONAL_PROMPTS.map((p) => (
          <PromptCard
            key={p.label}
            isDark={isDark}
            emoji={p.emoji}
            label={p.label}
            desc={p.desc}
            tip={p.tip}
            tipLink={p.tipLink}
            tipLinkLabel={p.tipLinkLabel}
            conflict={p.conflict}
            defaultEnabled={p.enabled}
          />
        ))}
      </div>

      <TutorialHintCard isDark={isDark}>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <span
              className="font-medium"
              style={{ color: isDark ? "#a855f7" : "#7e22ce" }}
            >
              默认开启
            </span>
            的条目（前 4 项）是推荐的基础配置，适合大多数创作场景。
          </li>
          <li>
            互斥提示词（如「抢话」与「防抢话」）请根据你的偏好二选一，不要同时启用。
          </li>
          <li>
            修改开关状态后，记得{" "}
            <span
              className="font-medium"
              style={{ color: isDark ? "#f472b6" : "#db2777" }}
            >
              保存预设
            </span>
            ，否则刷新后设置会丢失。
          </li>
        </ul>
      </TutorialHintCard>
    </div>
  );
}

/* ─────────────────── Step 3: 启用 / 禁用操作 ─────────────────── */

function StepToggle({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="打开提示词列表"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              点击顶部设置栏第 1 个 <span className="font-semibold">预设</span>{" "}
              图标，进入 <span className="font-semibold">对话补全预设</span>{" "}
              的提示词列表。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="找到目标条目"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              在{" "}
              <TutorialInlineCode isDark={isDark}>
                == 指南（可自定义）==
              </TutorialInlineCode>{" "}
              栏下方，找到以{" "}
              <TutorialInlineCode isDark={isDark} tone="pink">
                📍
              </TutorialInlineCode>{" "}
              开头的可选提示词条目。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="切换开关状态"
          accent="purple"
          isDark={isDark}
          detail={
            <>
              点击条目右侧的{" "}
              <span
                className="font-semibold inline-flex items-center gap-0.5"
                style={{ color: isDark ? "#c084fc" : "#7e22ce" }}
              >
                开关
                <ToggleRight size={14} className="stroke-[2px]" />
              </span>{" "}
              切换启用 / 禁用状态。
            </>
          }
          tip="开关为紫色表示已启用，灰色表示已禁用。"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="提示词列表" />

        <STNavbar
          activeIndex={0}
          highlightIndex={0}
          highlightColor="red"
          isDark={isDark}
        />

        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between mb-2">
            <STLabel isDark={isDark}>提示词</STLabel>
            <span
              className="text-xs"
              style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
            >
              总词符数：0
            </span>
          </div>

          <MockPromptListColumns isDark={isDark} />

          <div className="space-y-1.5">
            <MockPromptListRow
              isDark={isDark}
              emoji=""
              label="== 指南（可自定义）=="
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[禁词表] Avoid Cliché Expr…"
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[防软道歉] Avoid Evading"
              enabled={true}
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[防升华] No Wrap-up"
              enabled={false}
              highlight={true}
              toggleHighlightTooltip="点击启用"
              highlightEnabledToggleTone="pink"
            />
            <MockPromptListRow
              isDark={isDark}
              tone="pink"
              emoji="📍"
              label="[抢话] Narrative Proactivity"
              enabled={false}
            />
          </div>
        </div>
      </STPanel>
    </div>
  );
}

/* ─────────────────── Step 4: 保存预设 ─────────────────── */

function StepSave({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-10 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="保存预设"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              回到预设页面，点击名称输入框右侧的{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#f472b6" : "#db2777" }}
              >
                粉色保存按钮
              </span>{" "}
              将修改写入预设文件。
            </>
          }
          tip="不保存预设的话，刷新页面后修改会丢失。"
        />

        <TutorialLinkCard
          isDark={isDark}
          icon={LinkIcon}
          title="自定义提示词"
          description="内置可选提示词无法满足需求？学习如何创建完全自定义的提示词条目，精细控制 AI 的写作行为。"
          href="/tutorials/custom-prompt"
          ctaLabel="查看自定义提示词教程"
          theme="pink"
          className="max-w-md"
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} />

        <STNavbar
          activeIndex={0}
          highlightIndex={0}
          highlightColor="red"
          isDark={isDark}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <STLabel isDark={isDark}>对话补全预设</STLabel>
            <div className="flex gap-1">
              <STButton icon={LinkIcon} isDark={isDark} />
              <STButton icon={FileDown} isDark={isDark} />
              <STButton icon={FileUp} isDark={isDark} />
              <STButton icon={Trash2} isDark={isDark} />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <STInput value="Freesia Petals Full v5.3" isDark={isDark} />
            </div>
            <div className="flex gap-1">
              <div className="relative group">
                <STButton icon={Save} highlight="pink" isDark={isDark} />
                <div className="absolute bottom-full mb-2 right-0 bg-pink-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  记得保存
                </div>
              </div>
              <STButton icon={Edit2} isDark={isDark} />
              <STButton icon={Plus} isDark={isDark} />
            </div>
          </div>

          <div
            className="mt-2 space-y-2 pt-3"
            style={{
              borderTop: isDark
                ? "1px solid rgba(107,114,128,0.3)"
                : "1px solid rgba(236,72,153,0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <STCheckbox
                label="解锁上下文长度"
                checked={true}
                isDark={isDark}
              />
              <span
                className="text-xs"
                style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
              >
                AI可见的最大长度
              </span>
            </div>
            <div className="space-y-1">
              <div
                className="flex justify-between text-xs"
                style={{ color: isDark ? "#9ca3af" : "#64748b" }}
              >
                <span>上下文长度 (词符)</span>
                <span className="font-mono text-blue-400">2000000</span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: isDark ? "#374151" : "#e2e8f0" }}
              >
                <div className="h-full w-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </STPanel>
    </div>
  );
}

/* ─────────────────── Main Page ─────────────────── */

interface Step extends TutorialStepItem {
  content: (isDark: boolean) => React.ReactNode;
}

const steps: Step[] = [
  {
    title: "了解可选提示词",
    desc: "内置行为调节模块的位置与用法",
    content: (isDark) => <StepOverview isDark={isDark} />,
  },
  {
    title: "功能说明",
    desc: "全部可选提示词的功能介绍",
    content: (isDark) => <StepCatalog isDark={isDark} />,
  },
  {
    title: "启用 / 禁用",
    desc: "在提示词列表中切换开关状态",
    content: (isDark) => <StepToggle isDark={isDark} />,
  },
  {
    title: "保存预设",
    desc: "将修改写入预设",
    content: (isDark) => <StepSave isDark={isDark} />,
  },
];

export default function OptionalPrompts() {
  const { isDark, toggleTheme } = useTutorialTheme();
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length);

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Settings className="w-3.5 h-3.5" />}
        badgeLabel="配置指南"
        title="可选功能提示词"
        description="按需启用内置行为调节模块，精细控制叙事节奏、角色塑造与 NSFW 场景行为。"
      />

      <TutorialStepNavigator
        isDark={isDark}
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      >
        {steps[currentStep].content(isDark)}
      </TutorialStepNavigator>
    </TutorialPageShell>
  );
}
