import {
  Palette,
  Save,
  FileDown,
  FileUp,
  Trash2,
  Edit2,
  Plus,
  Link as LinkIcon,
  FileText,
  MapPin,
  PenLine,
} from "lucide-react";
import type { Route } from "./+types/tutorials.custom-prompt";
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
  MockPromptEditDialogActions,
  MockPromptEditDialogHeader,
  MockPromptListColumns,
  MockPromptListRow,
} from "~/components/ui/tutorial-mock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "自定义提示词 — 花瓣预设 Petals Preset" },
    {
      name: "description",
      content:
        "花瓣预设自定义提示词教程 — 学习如何创建自定义提示词条目，控制 AI 的写作节奏、行为偏好等细节。",
    },
  ];
}

/* ───────────────────────── Step 1: 了解提示词位置 ───────────────────────── */

function StepUnderstand({ isDark }: { isDark: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="什么是自定义提示词"
          accent="blue"
          isDark={isDark}
          detail={
            <>
              自定义提示词是你自行编写的指令片段。你可以用它来控制 AI 的
              <span className="font-semibold">
                写作节奏、行为偏好、叙事禁忌
              </span>
              等任何细节。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="放置位置"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              新建的自定义提示词应置于{" "}
              <TutorialInlineCode isDark={isDark}>
                指南
              </TutorialInlineCode>{" "}
              栏{" "}
              <TutorialInlineCode isDark={isDark}>🌸Freesia</TutorialInlineCode>{" "}
              条目下方。
            </>
          }
          tip="若你的提示词包含特定输出结构（如状态栏、变量更新），建议置于 📍[事件梗概] Event Synopsis 下方。"
        />

        <GuideStepCard
          index={3}
          title="推荐格式"
          accent="green"
          isDark={isDark}
          detail={
            <>
              使用{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#4ade80" : "#16a34a" }}
              >
                Markdown 二级标题 + 列表
              </span>{" "}
              组织内容。建议在提示词末尾保留一行空行，便于酒馆合并提示词时与其他条目保持分隔。
            </>
          }
        />
      </div>

      {/* Right side: placement visual */}
      <div className="space-y-4">
        <div
          className="rounded-xl p-5 space-y-4"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(15,12,24,0.8), rgba(26,22,37,0.6))"
              : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,245,255,0.5))",
            border: isDark
              ? "1px solid rgba(236,72,153,0.15)"
              : "1px solid rgba(236,72,153,0.1)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin
              size={18}
              style={{ color: isDark ? "#f472b6" : "#ec4899" }}
            />
            <span
              className="text-sm font-bold"
              style={{ color: isDark ? "#e5e7eb" : "#334155" }}
            >
              推荐放置位置
            </span>
          </div>

          {/* Prompt list sketch */}
          <div className="space-y-1.5">
            {[
              { label: "== 指南（可自定义）==", faded: true },
              { label: "🌸Freesia", faded: false },
              { label: "✨ 你的自定义提示词", highlight: true },
              { label: "📍[事件梗概] Event Synopsis", faded: false },
              { label: "✨ 含输出结构的提示词", highlightAlt: true },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  background: item.highlight
                    ? isDark
                      ? "rgba(236,72,153,0.12)"
                      : "rgba(236,72,153,0.06)"
                    : item.highlightAlt
                      ? isDark
                        ? "rgba(34,197,94,0.1)"
                        : "rgba(34,197,94,0.05)"
                      : isDark
                        ? "rgba(30,30,40,0.6)"
                        : "rgba(250,245,255,0.6)",
                  border: item.highlight
                    ? isDark
                      ? "1px solid rgba(236,72,153,0.3)"
                      : "1px solid rgba(236,72,153,0.2)"
                    : item.highlightAlt
                      ? isDark
                        ? "1px solid rgba(34,197,94,0.25)"
                        : "1px solid rgba(34,197,94,0.15)"
                      : isDark
                        ? "1px solid rgba(107,114,128,0.15)"
                        : "1px solid rgba(236,72,153,0.05)",
                  color: item.faded
                    ? isDark
                      ? "#6b7280"
                      : "#94a3b8"
                    : item.highlight
                      ? isDark
                        ? "#f472b6"
                        : "#db2777"
                      : item.highlightAlt
                        ? isDark
                          ? "#4ade80"
                          : "#16a34a"
                        : isDark
                          ? "#d1d5db"
                          : "#475569",
                  fontWeight: item.highlight || item.highlightAlt ? 600 : 400,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 text-xs pt-2"
            style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
          >
            <FileText size={12} />
            <span>
              <span style={{ color: isDark ? "#f472b6" : "#db2777" }}>粉色</span>
              ：一般自定义提示词 ·{" "}
              <span style={{ color: isDark ? "#4ade80" : "#16a34a" }}>绿色</span>
              ：含输出结构的提示词
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Step 2: 新建提示词条目 ───────────────────────── */

function StepCreateEntry({ isDark }: { isDark: boolean }) {
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
              点击顶部设置栏第 1 个{" "}
              <span className="font-semibold">预设</span> 图标，进入{" "}
              <span className="font-semibold">对话补全预设</span>{" "}
              的提示词列表。
            </>
          }
        />

        <GuideStepCard
          index={2}
          title="找到插入位置"
          accent="red"
          isDark={isDark}
          detail={
            <>
              在列表中找到{" "}
              <TutorialInlineCode isDark={isDark}>
                == 指南（可自定义）==
              </TutorialInlineCode>{" "}
              栏下方的{" "}
              <TutorialInlineCode isDark={isDark}>🌸Freesia</TutorialInlineCode>{" "}
              条目。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="新建提示词"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              点击提示词栏右侧的{" "}
              <span
                className="font-semibold inline-flex items-center gap-0.5"
                style={{ color: isDark ? "#f9a8d4" : "#db2777" }}
              >
                新增
                <Plus size={14} className="stroke-[2.5px]" />
              </span>{" "}
              按钮新建条目。点击{" "}
              <span
                className="font-semibold inline-flex items-center gap-0.5"
                style={{ color: isDark ? "#f9a8d4" : "#db2777" }}
              >
                链接
                <LinkIcon size={14} className="stroke-[2.5px]" />
              </span>{" "}
              将提示词条目添加到列表，拖动到对应位置。
            </>
          }
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
              emoji="🌸"
              label="Freesia"
              enabled={true}
              highlight={false}
            />
            <MockPromptListRow
              isDark={isDark}
              emoji=""
              label="自定义提示词条目"
              enabled={true}
              highlight={true}
              onEditHighlight={true}
            />
            <MockPromptListRow
              isDark={isDark}
              emoji="📍"
              label="[事件梗概] Event Synopsis"
              enabled={true}
            />
          </div>
        </div>
      </STPanel>
    </div>
  );
}

/* ───────────────────────── Step 3: 编写提示词内容 ───────────────────────── */

function StepEditContent({ isDark }: { isDark: boolean }) {
  const fieldBg = isDark ? "#0b0c0f" : "#ffffff";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
      <div className="space-y-3">
        <GuideStepCard
          index={1}
          title="编写提示词"
          accent="pink"
          isDark={isDark}
          detail={
            <>
              在编辑框的{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#f9a8d4" : "#db2777" }}
              >
                提示词
              </span>{" "}
              区域编写内容。推荐使用{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#f472b6" : "#db2777" }}
              >
                Markdown 二级标题 + 列表
              </span>{" "}
              格式组织，清晰直观。
            </>
          }
          tip="末尾保留一行空行，酒馆合并提示词时可与其他条目保持分隔。"
        />

        <GuideStepCard
          index={2}
          title="考虑添加 CoT 问题"
          accent="yellow"
          isDark={isDark}
          detail={
            <>
              若希望显著改变花瓣预设行为，可以考虑通过{" "}
              <TutorialInlineCode isDark={isDark}>
                addglobalvar
              </TutorialInlineCode>{" "}
              宏添加 Petals CoT 问题，引导花瓣在思考时关注你的要求。
            </>
          }
        />

        <GuideStepCard
          index={3}
          title="保存编辑"
          accent="green"
          isDark={isDark}
          detail={
            <>
              编辑完成后，点击右下角{" "}
              <span
                className="font-semibold"
                style={{ color: isDark ? "#4ade80" : "#16a34a" }}
              >
                保存
              </span>{" "}
              按钮关闭编辑对话框。
            </>
          }
        />
      </div>

      <STPanel isDark={isDark} className="relative">
        <SimulationBadge isDark={isDark} label="编辑对话框" />
        <div className="pt-2 space-y-4">
          <MockPromptEditDialogHeader
            isDark={isDark}
            name="📍[慢推进] Pacing Control"
          />

          <div>
            <div
              className="text-xs font-medium mb-1"
              style={{ color: isDark ? "#e5e7eb" : "#334155" }}
            >
              提示词
            </div>
            <div className="relative group">
              <div
                className="px-3 py-2.5 rounded-lg text-[11px] leading-relaxed font-mono whitespace-pre-wrap min-h-[180px]"
                style={{
                  background: fieldBg,
                  border: isDark
                    ? "2px solid rgba(236,72,153,0.5)"
                    : "2px solid rgba(236,72,153,0.4)",
                  color: isDark ? "#d1d5db" : "#475569",
                  boxShadow: isDark
                    ? "0 0 12px rgba(236,72,153,0.15)"
                    : "0 0 12px rgba(236,72,153,0.1)",
                }}
              >
                <span style={{ color: isDark ? "#9ca3af" : "#64748b" }}>
                  ## Pacing Control
                </span>
                <br />
                <span
                  className="font-semibold"
                  style={{ color: isDark ? "#f472b6" : "#db2777" }}
                >
                  - **Preferred approach**: Focus on the immediate moment—current
                  dialogue exchanges, ongoing actions, and subtle environmental
                  or emotional details—rather than rushing toward future plot
                  points.
                </span>
                <br />
                <span
                  className="font-semibold"
                  style={{ color: isDark ? "#f472b6" : "#db2777" }}
                >
                  - **Avoid**: Cramming multiple significant events,
                  revelations, or emotional turning points into a single
                  response.
                </span>
                <br />
                <span
                  style={{ color: isDark ? "#6b7280" : "#94a3b8" }}
                >
                  {"(末尾保留空行)"}
                </span>
              </div>
              <div
                className="absolute -top-3 right-2 text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: isDark ? "#ec4899" : "#db2777",
                  color: "#fff",
                }}
              >
                在此编辑
              </div>
            </div>
          </div>

          <MockPromptEditDialogActions isDark={isDark} highlightSave={true} />
        </div>
      </STPanel>
    </div>
  );
}

/* ───────────────────────── Step 4: 保存预设 ───────────────────────── */

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
          title="定制 CoT 问题"
          description="通过添加 CoT 问题，引导花瓣在思考时关注你的自定义提示词要求，让行为改变更显著。"
          href="/tutorials/custom-cot?step=3"
          ctaLabel="查看 addglobalvar 宏用法"
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
              <STInput value="Freesia Petals v5.4" isDark={isDark} />
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

/* ───────────────────────── Main Page ───────────────────────── */

interface Step extends TutorialStepItem {
  content: (isDark: boolean) => React.ReactNode;
}

const steps: Step[] = [
  {
    title: "了解提示词位置",
    desc: "自定义提示词的放置位置与推荐格式",
    content: (isDark) => <StepUnderstand isDark={isDark} />,
  },
  {
    title: "新建提示词条目",
    desc: "在提示词列表中创建新条目",
    content: (isDark) => <StepCreateEntry isDark={isDark} />,
  },
  {
    title: "编写提示词内容",
    desc: "使用 Markdown 格式编写指令",
    content: (isDark) => <StepEditContent isDark={isDark} />,
  },
  {
    title: "保存预设",
    desc: "将修改写入预设",
    content: (isDark) => <StepSave isDark={isDark} />,
  },
];

export default function CustomPrompt() {
  const { isDark, toggleTheme } = useTutorialTheme();
  const { currentStep, setCurrentStep } = useTutorialStepQuery(steps.length);

  return (
    <TutorialPageShell isDark={isDark} onToggleTheme={toggleTheme}>
      <TutorialPageHeader
        isDark={isDark}
        badgeIcon={<Palette className="w-3.5 h-3.5" />}
        badgeLabel="定制教程"
        title="自定义提示词"
        description="创建自定义提示词条目，精细控制 AI 的写作节奏与行为偏好。"
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
