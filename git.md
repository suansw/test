GIT
===========


###Config
--------
git rev-parse --git-dir找到.git目录,里面有一个config文件
```
[user]
    name = tommyx
    email = tommyx@synnex.com
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    last = log -1 HEAD
    cf = config
    md = commit --amend
    dt = difftool
    mt = mergetool
    line = log --oneline
    latest = for-each-ref --sort=-committerdate --format='%(committerdate:short) %(refname:short) [%(committername)]'
    ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
    log2=log --pretty=format:\"%Cgreen%ai [%h] %Cblue<%an> %Cred%s\" --date-order
    hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
    type = cat-file -t
    dump = cat-file -p
[color]
    diff = auto
    status = auto
    branch = auto
    ui = true
[http]
    sslverify = true
[https]
    sslverify = true
[push]
    default =  matching
```

###Flow
---------
1.获取服务器主分支代码(master)
```
https://github.com/shadowsocks/shadowsocks-libev/
```
2.保存到自己的私有仓库(fork repository)
```
click Fork 
```
3.把代码下到本机
```
git clone git@hyvesolutions.com:tommyx/project.git
```
####为什么不用https的地址####https://github.com/shadowsocks/shadowsocks-libev.git ?
4.有新的需求,ticket,bug需要修复
```
git branch
git branch -r
git checkout master 切换到master分支
git branch ticketNo.someKeyWords 基于master分支建立一个新分支
e.g.:  pm8888.fix.rack.ptu
```
5.添加和修改文件
```
git add filename
git add .
```
6.提交修改到本地缓存区
```
git commit -a
输入一些comments
```
7.推送本地缓存区的修改集到自己的私有仓库
```
git push origin pm8888.fix.rack.ptu:pm8888.fix.rack.ptu
```
8.提交pull request
```
点击Compare & review
```
9.和服务器上的master有冲突
```
git remote add upstream git@hyvesolutions.com:project.git  添加一个远程仓库到git的配置文件
git fetch upstream/master   获取远程仓库的master分支的内容
git branch                  查看本地的当前分支
git checkout master         切换到本地的master分支
git merge upstream/master   把远程仓库的master合并到本地的master,使得本地master分支保持最新.
git checkout pm8888.fix.rack.ptu 切换到需要解决冲突的分支
git merge master            合并本地的master分支.
git mergetool               出现冲突后,使用git mergetool来弹出合并工具手动对比,合并代码

git commit -a               提交本次的修改(解决冲突)
git push origin pm8888      再次提交
github会在主仓库的pull request那里自动刷新你的本次提交
```

###Git Corporate
--------
```
User A branch, e.g.: pmAAAA
User B branch, e.g.: pmBBBB
如果A的branch依赖B的分支,但是最新的master里面并没有合并B的分支,A如何做集成开发测试
```
1.git remote add Bname git@hyvesolutions.com:Bname/project.git 添加B的仓库地址到A本地

2.git fetch Bname/pmBBBB    获取B的这个分支(前提是B已经提交到它自己的私人仓库,并且你有权限)

3.git status                查看当前分支是否有修改.

4.git stash                 保存当前分支的修改到git缓存区

5.git branch                查看当前本地的分支是否是pmAAAA, 如果不是就切换过去git checkout pmAAAA

6.git branch pmAAAA.test    基于pmAAAA在本地新建一个pmAAAA.test的分支

7.git merge Bname/pmBBBB    合并B的pmBBBB分支

8.test function

9.git checkout pmAAAA       修改某些代码

10.git stash pop             还原之前的修改

11.git commit -a             提交本次修改

12.git checkout pmAAAA.test 再次切换过去

13.git merge pmAAAA         合并刚才的修改,再次测试.测试通过

12.git push origin pmAAAA

###Basic Command
---------
1.git config
```
git config --global user.name "tommyx"
    git config --unset --global user.name
git confit --global user.email tommyx@synnex.com
    git config --unset --global user.email
    git commit --amend --allow-empty --reset-author
git config --system alias.st status
git config --system alias.ci commit
git config --system alias.co checkout
git config --system alias.br branch
git config --global color.ui true
git config --global merge.tool meld

git config --list
```
2.git status 
```
git status
git status <file>
git status .
```
3.git clone https or ssh address 
```
git clone ssh://github.com/shadowsocks/shadowsocks-libev.git
git clone https://github.com/shadowsocks/shadowsocks-libev.git
```
4.git log
```
git log <file> 查看该文件每次提交记录
git log -p <file> 查看每次详细修改内容的diff
git log -p -2 查看最近两次详细修改内容的diff
git log -stat 查看每次提交的文件变更统计
git log --pretty=oneline 精简输出log
git status -s 精简格式输出状态
```
5.git diff
```
git diff <file> 比较当前文件和暂存区文件的差异
git diff <$id1> <$id2> 比较两次提交之间的差异
git diff <branch1> <branch2> 在两个分支之间比较
git diff --stat 仅仅比较统计信息
git diff --cached 查看提交暂存区和版本库中文件的差异
git diff --staged 提交任务 和版本库中文件的差异(stage 暂存区)
git diff HEAD 将工作区和HEAD (和当前工作区) 对比
git diff 分支1 分支2 -- 文件名, 可以对比不同分支的文件的差异.
git diff 分支1号 分支2号 --name-only 输出两个分支的差异文件地址
git diff 分支1号 分支2号 --name-only | xargs tar -zcvf xxx_update.tar.gz 打包自某个版本到某个版本的更新内容
```
6.git pull=git fetch and git merge
####为什么不推荐用git pull
7.git branch
```
git branch -r # 查看远程分支
git branch <new_branch># 创建新的分支
git branch -v # 查看各个分支最后提交信息
git branch --merged # 查看已经被合并到当前分支的分支
git branch --no-merged # 查看尚未被合并到当前分支的分支
git branch -d <branch> # 删除某个分支
git branch -D <branch> # 强制删除某个分支,(未被合并的分支被删除的时候需要强制)
```
8.git merge
```
git merge <branch> # 将branch分支合并到当前分支
git merge origin/master --no-ff # 不要Fast-Foward 合并,这样可以生成merge提交,生成新的id
```
9.git stash
```
git stash # 保存当前工作进度
git stash list # 列所有stash
git stash apply # 恢复暂存的内容
git stash drop # 删除暂存区
git stash save #暂存内容到暂存区
git stash pop #弹出暂存的内容

git stash save "save_name"  # give the stash a name
git stash clear             # delete a stashed commit 
git stash save --keep-index # stash only unstaged files
```
10.git show
```
git show #id 显示某次提交的内容
```
11.git checkout
```
git checkout --<file> # 抛弃工作区修改
git checkout . # 抛弃工作区修改
git checkout -b <new_branch> #创建新的分支,并且切换过去
git checkout -b <new_branch> <branch> #基于branch创建新的new_branch
git checkout $id -b <new_branch> #把某次历史提交记录checkout出来,并创建成一个分支
```
12.git add
```
git add <file> # 将工作文件修改提交到本地暂存区
git add . # 将所有修改过的文件提交到暂存区
```
13.git rm
```
git rm <file> # 从版本库中删除文件
git rm <file> --cached #从版本库中删除文件,但不删除文件
```
14.git reset
```
git reset <file> # 从暂存区恢复到工作文件
git reset -- . # 从暂存区恢复到工作文件
git reset --hard # 恢复最近一次提交的状态,即放弃上次提交后的所有本次修改, merge前的分支
```
15.git commit
```
git commit <file> #
git commit . #
git commit -a # 将git add,git rm 和git ci 等操作合并在一起做
git commit -am "some comments"
git commit --amend # 修改最后一次提交记录
```
16.git revert
```
git revert 本身是提交一个版本, 只不过是将要revert版本的内容再反向修改回去,版本会递增并且不会影响以前提交的内容/
git revert <$id> # 恢复某次提交的状态,恢复动作本身也创建了一次提交对象
git revert HEAD # 恢复最后一次提交的状态
git revert HEAD^  恢复前前次的commit
```
17.git remote
```
git remote -v # 查看远程服务器地址和仓库名称
git remote show origin # 查看远程服务器仓库状态
git remote add origin git@ github:test/test.git # 添加远程仓库地址
git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址)
git remote rm <repository> # 删除远程仓库
git branch -d -r origin/branch_name 删除远程仓库分支 git push origin --delete branch_name 
git branch -D master develop 删除掉本地develop分支
```
18.git fetch
```
git fetch origin remote_branch_name:local_branch_name
git fetch upstream remote_branch_name:local_branch_name
```
19.git tag
```
git tag  显示tag list
git tag -l 'v1.x' tag v1.x的详细
git tag -a v1.1 -m 'my dev 1.1' 打一个tag
git show 可以查看tag信息 git show v1.1
git push origin [tagname] 就可以把tag同步到远程
git push origin --tags 可以推送本地所有tag

git fetch --tags upstream 获取远端所有tags
git merge tag_name 
git checkout tags/<tag_name>
```
